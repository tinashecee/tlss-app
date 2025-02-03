import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Villageship } from '../../_model/Chieftainship';
import { VillageHead } from '../../_model/Traditionalleader';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private apiUrl = 'http://localhost:3306'; // Your API URL
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData); // Parse JSON
      if (user.token) {
        return new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
      }
    }
    return new HttpHeaders();
  }

  getallvillageships(): Observable<Villageship[]> {
    return this.http.get<Villageship[]>(`${this.apiUrl}/villageships`, {
      headers: this.getHeaders(),
    });
  }

  getallheadmanships(): Observable<Villageship[]> {
    return this.http.get<Villageship[]>(`${this.apiUrl}/headmanships`, {
      headers: this.getHeaders(),
    });
  }

  getallchieftainships(): Observable<Villageship[]> {
    return this.http.get<Villageship[]>(`${this.apiUrl}/chieftainships`, {
      headers: this.getHeaders(),
    });
  }

  GetAllChiefs(): Observable<VillageHead[]> {
    return this.http.get<VillageHead[]>(`${this.apiUrl}/chiefs`, {
      headers: this.getHeaders(),
    });
  }

  GetAllHeadman(): Observable<VillageHead[]> {
    return this.http.get<VillageHead[]>(`${this.apiUrl}/headman`, {
      headers: this.getHeaders(),
    });
  }

  GetAllVillagehead(): Observable<VillageHead[]> {
    return this.http.get<VillageHead[]>(`${this.apiUrl}/villageheads`, {
      headers: this.getHeaders(),
    });
  }

  GetChiefbyId(id: number): Observable<VillageHead> {
    return this.http.get<VillageHead>(`${this.apiUrl}/chiefs/?id=${id}`, {
      headers: this.getHeaders(),
    });
  }

  GetHeadmanbyId(id: number): Observable<VillageHead> {
    return this.http.get<VillageHead>(`${this.apiUrl}/headman/?id=${id}`, {
      headers: this.getHeaders(),
    });
  }

  GetVillageheadbyId(id: number): Observable<VillageHead> {
    return this.http.get<VillageHead>(`${this.apiUrl}/villageheads/?id=${id}`, {
      headers: this.getHeaders(),
    });
  }

  GetChieftainshipbyId(id: number): Observable<VillageHead> {
    return this.http.get<VillageHead>(
      `${this.apiUrl}/chieftainships/?id=${id}`,
      { headers: this.getHeaders() }
    );
  }

  GetHeadmanshipbyId(id: number): Observable<VillageHead> {
    return this.http.get<VillageHead>(`${this.apiUrl}/headmanships/?id=${id}`, {
      headers: this.getHeaders(),
    });
  }

  GetVillageshipbyId(id: number): Observable<VillageHead> {
    return this.http.get<VillageHead>(`${this.apiUrl}/villageship/?id=${id}`, {
      headers: this.getHeaders(),
    });
  }

  //
  saveFormData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chiefs`, data);
  }
  saveFormDataA(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/headman`, data);
  }

  // New method to edit chief status
  editChiefStatus(id: number, newStatus: any, dt: any): Observable<any> {
    const url = `${this.apiUrl}/chiefs/${id}`;
    return this.http.patch(url, {
      status: newStatus.status,
      dateofdeathorremoval: dt.dateofdeathorremoval,
    });
  }
  editHeadStatus(id: number, newStatus: any, dt: any): Observable<any> {
    const url = `${this.apiUrl}/headman/${id}`;
    return this.http.patch(url, {
      status: newStatus.status,
      dateofdeathorremoval: dt.dateofdeathorremoval,
    });
  }

  haveaccess() {
    return true;
  }

  uploadChiefs(chiefs: any[]): Observable<any> {
    console.log(chiefs);
    return this.http.post(`${this.apiUrl}/chiefs/upload`, chiefs, {
      headers: this.getHeaders(),
    });
  }

  deleteChief(chiefId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/chiefs/${chiefId}`, {
      headers: this.getHeaders(),
    });
  }

  updateChief(chiefId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chiefs/${chiefId}`, data, {
      headers: this.getHeaders(),
    });
  }
}
