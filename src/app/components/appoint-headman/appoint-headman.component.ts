import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-appoint-headman',
  standalone: true,
  imports: [MaterialModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appoint-headman.component.html',
  styleUrl: './appoint-headman.component.scss',
})
export class AppointHeadmanComponent implements OnInit {
  optionFormGroup!: FormGroup;
  dateFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  showSaveStatusButton = false;
  disableOtherForms = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.optionFormGroup = this._formBuilder.group({
      status1: ['', Validators.required],
    });
    this.dateFormGroup = this._formBuilder.group({
      date1: ['', Validators.required],
    });
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
    // Listen for changes to the status field in optionFormGroup
    const statusControl = this.optionFormGroup.get('status1');
    if (statusControl) {
      statusControl.valueChanges.subscribe((value) => {
        this.onStatusChange(value);
      });
    }
  }
  onStatusChange(status: string) {
    if (status === 'Substantive' || status === 'Acting') {
      this.showSaveStatusButton = true;
      this.disableOtherForms = true;
    } else {
      this.showSaveStatusButton = false;
      this.disableOtherForms = false;
    }
  }
  onSubmit() {
    // You can handle form submission here
    const formData = {
      ...this.optionFormGroup.value,
      ...this.dateFormGroup.value,
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
    };

    console.log('Form Data:', formData);
  }
  onSubmit1() {
    this.optionFormGroup.value;
  }
}
