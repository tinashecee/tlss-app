import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-appoint-chief',
  standalone: true,
  imports: [MaterialModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appoint-chief.component.html',
  styleUrl: './appoint-chief.component.scss',
})
export class AppointChiefComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      id_number: ['', Validators.required],
      incumbent: ['', Validators.required],
      district: ['', Validators.required],
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      ecnumber: ['', Validators.required],
      mutupo: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      contactnumber: ['', Validators.required],
      physicalladdress: ['', Validators.required],
      bank: ['', Validators.required],
      accountnumber: ['', Validators.required],
      carreg: ['', Validators.required],
      dateofissue: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      nextofkin: ['', Validators.required],
      spouses: ['', Validators.required],
      offspring: ['', Validators.required],
      messenger: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      dateofappointment: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
}
