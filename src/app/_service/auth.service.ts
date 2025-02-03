import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface SignupData {
  username: string;
  email: string;
  phone_number: string;
  province: string;
  district: string;
  role: string;
  password: string;
}

interface UserData {
  username: string;
  token: string;
  expiresAt?: number; // Timestamp when token expires
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserData | null>;
  public currentUser: Observable<UserData | null>;
  private apiUrl = 'http://localhost:3306'; // Your API URL
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserData | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();

    // Check if there's a stored user and set up expiration timer if needed
    const user = this.getUserFromStorage();
    if (user && user.expiresAt) {
      this.setTokenTimer(user.expiresAt);
    }
  }

  private getUserFromStorage(): UserData | null {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return null;

    const user = JSON.parse(storedUser);

    // If user exists but token is expired, clear everything
    if (user && user.expiresAt && user.expiresAt < Date.now()) {
      this.logout();
      return null;
    }

    return user;
  }

  private setTokenTimer(expiresAt: number) {
    // Clear any existing timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    // Calculate time until expiration
    const timeUntilExpiry = expiresAt - Date.now();

    if (timeUntilExpiry > 0) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
        this.router.navigate(['/login']);
      }, timeUntilExpiry);
    }
  }

  public get currentUserValue(): UserData | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((response) => {
          // Calculate expiration time (1 hour from now)
          const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds

          const user: UserData = {
            username,
            token: response.token,
            expiresAt,
          };

          // Store user with expiration
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          // Set up expiration timer
          this.setTokenTimer(expiresAt);

          return user;
        })
      );
  }

  signup(userData: SignupData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData);
  }

  logout() {
    // Clear timeout if it exists
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const user = this.currentUserValue;
    if (!user || !user.token || !user.expiresAt) {
      return false;
    }

    // Check if token is expired
    if (user.expiresAt < Date.now()) {
      this.logout();
      return false;
    }

    return true;
  }
}
