import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-appoint-chief',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './appoint-chief.component.html',
  styleUrl: './appoint-chief.component.scss',
})
export class AppointChiefComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      id_number: ['', Validators.required],
      incumbent: ['', Validators.required],
      district: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      province: ['', Validators.required],
      chieftainship: ['', Validators.required],
      mutupo: ['', Validators.required],
      ecnumber: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      dateofappointment: ['', Validators.required],
      status: ['', Validators.required],
      contactnumber: ['', Validators.required],
      physicalladdress: ['', Validators.required],
    });
  }
}
