import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { AuthService } from '../../_service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, MaterialModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.signupForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone_number: ['', [Validators.required]],
        province: ['', [Validators.required]],
        district: ['', [Validators.required]],
        role: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = { ...this.signupForm.value };
      delete signupData.confirmPassword; // Remove confirmPassword before sending

      this.authService.signup(signupData).subscribe({
        next: () => {
          this._snackBar.open(
            'Registration successful, please verify your email',
            'Close',
            {
              duration: 3000,
            }
          );
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this._snackBar.open(
            error.error.message || 'Registration failed',
            'Close',
            { duration: 3000 }
          );
        },
      });
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
}
