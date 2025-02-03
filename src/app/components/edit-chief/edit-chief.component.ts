import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../_service/master.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-chief',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  template: `
    <div class="edit-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Edit Chief</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
            <!-- Required Fields -->
            <div class="form-section">
              <h3>Required Information</h3>
              <mat-form-field appearance="fill">
                <mat-label>ID Number</mat-label>
                <input matInput formControlName="id_number" required />
                <mat-error
                  *ngIf="editForm.get('id_number')?.hasError('required')"
                >
                  ID Number is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Name</mat-label>
                <input matInput formControlName="incumbent" required />
                <mat-error
                  *ngIf="editForm.get('incumbent')?.hasError('required')"
                >
                  Name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Province</mat-label>
                <input matInput formControlName="province" required />
                <mat-error
                  *ngIf="editForm.get('province')?.hasError('required')"
                >
                  Province is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>District</mat-label>
                <input matInput formControlName="district" required />
                <mat-error
                  *ngIf="editForm.get('district')?.hasError('required')"
                >
                  District is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Chieftainship</mat-label>
                <input matInput formControlName="chieftainship" required />
                <mat-error
                  *ngIf="editForm.get('chieftainship')?.hasError('required')"
                >
                  Chieftainship is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Gender</mat-label>
                <mat-select formControlName="gender" required>
                  <mat-option value="Male">Male</mat-option>
                  <mat-option value="Female">Female</mat-option>
                </mat-select>
                <mat-error *ngIf="editForm.get('gender')?.hasError('required')">
                  Gender is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Date of Birth</mat-label>
                <input
                  matInput
                  [matDatepicker]="dobPicker"
                  formControlName="dateofbirth"
                  required
                />
                <mat-datepicker-toggle
                  matSuffix
                  [for]="dobPicker"
                ></mat-datepicker-toggle>
                <mat-datepicker #dobPicker></mat-datepicker>
                <mat-error
                  *ngIf="editForm.get('dateofbirth')?.hasError('required')"
                >
                  Date of Birth is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Date of Appointment</mat-label>
                <input
                  matInput
                  [matDatepicker]="doaPicker"
                  formControlName="dateofappointment"
                  required
                />
                <mat-datepicker-toggle
                  matSuffix
                  [for]="doaPicker"
                ></mat-datepicker-toggle>
                <mat-datepicker #doaPicker></mat-datepicker>
                <mat-error
                  *ngIf="
                    editForm.get('dateofappointment')?.hasError('required')
                  "
                >
                  Date of Appointment is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Optional Fields -->
            <div class="form-section">
              <h3>Additional Information</h3>
              <mat-form-field appearance="fill">
                <mat-label>Mutupo</mat-label>
                <input matInput formControlName="mutupo" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>EC Number</mat-label>
                <input matInput formControlName="ecnumber" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Status</mat-label>
                <input matInput formControlName="status" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Bank</mat-label>
                <input matInput formControlName="bank" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Account Number</mat-label>
                <input matInput formControlName="accountnumber" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Contact Number</mat-label>
                <input matInput formControlName="contactnumber" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Next of Kin</mat-label>
                <input matInput formControlName="nextofkin" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Car Registration Number</mat-label>
                <input matInput formControlName="car_reg_no" />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Date of Issue</mat-label>
                <input
                  matInput
                  [matDatepicker]="doiPicker"
                  formControlName="dateofissue"
                />
                <mat-datepicker-toggle
                  matSuffix
                  [for]="doiPicker"
                ></mat-datepicker-toggle>
                <mat-datepicker #doiPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Date of Death/Removal</mat-label>
                <input
                  matInput
                  [matDatepicker]="dodPicker"
                  formControlName="dateofdeathorremoval"
                />
                <mat-datepicker-toggle
                  matSuffix
                  [for]="dodPicker"
                ></mat-datepicker-toggle>
                <mat-datepicker #dodPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Physical Address</mat-label>
                <textarea
                  matInput
                  formControlName="physicalladdress"
                  rows="3"
                ></textarea>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Spouses</mat-label>
                <textarea
                  matInput
                  formControlName="spouses"
                  rows="3"
                ></textarea>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Offspring</mat-label>
                <textarea
                  matInput
                  formControlName="offspring"
                  rows="3"
                ></textarea>
              </mat-form-field>
            </div>

            <div class="button-row">
              <button mat-button type="button" (click)="goBack()">
                Cancel
              </button>
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!editForm.valid"
              >
                Save Changes
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .edit-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
        padding: 16px;
        background-color: #f5f5f5;
        border-radius: 4px;
      }

      .form-section h3 {
        margin: 0;
        color: #666;
      }

      .button-row {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        margin-top: 16px;
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class EditChiefComponent implements OnInit {
  editForm: FormGroup;
  chiefId: string = '';

  constructor(
    private fb: FormBuilder,
    private service: MasterService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      id_number: ['', Validators.required],
      incumbent: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      chieftainship: ['', Validators.required],
      mutupo: [''],
      ecnumber: [''],
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      dateofappointment: ['', Validators.required],
      status: [''],
      bank: [''],
      accountnumber: [''],
      contactnumber: [''],
      nextofkin: [''],
      biosignature: [''],
      picture: [''],
      spouses: [''],
      offspring: [''],
      car_reg_no: [''],
      dateofissue: [''],
      dateofdeathorremoval: [''],
      physicalladdress: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.chiefId = params['id'];
      this.loadChiefData();
    });
  }

  loadChiefData() {
    this.service.GetChiefbyId(Number(this.chiefId)).subscribe({
      next: (chief) => {
        this.editForm.patchValue(chief);
      },
      error: (error) => {
        this._snackBar.open(
          'Error loading chief data: ' + error.message,
          'Close',
          {
            duration: 5000,
          }
        );
      },
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.service.updateChief(this.chiefId, this.editForm.value).subscribe({
        next: () => {
          this._snackBar.open('Chief updated successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/chiefs']);
        },
        error: (error) => {
          this._snackBar.open(
            'Error updating chief: ' + error.message,
            'Close',
            {
              duration: 5000,
            }
          );
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/chiefs']);
  }
}
