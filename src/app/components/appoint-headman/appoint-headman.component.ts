import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MasterService } from '../../_service/master.service';
import { Router } from '@angular/router';
import { VillageHead } from '../../../_model/Traditionalleader';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  stepperValid = false;
  staticData: any;
  largestId = 0;
  isEditable = false;

  constructor(
    private _formBuilder: FormBuilder,
    private masterService: MasterService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.staticData = navigation?.extras?.state?.['data'];
    this.loadInitialData();
    console.log(this.staticData);
  }

  ngOnInit() {
    this.optionFormGroup = this._formBuilder.group({
      status: ['', Validators.required],
    });
    this.dateFormGroup = this._formBuilder.group({
      dateofdeathorremoval: ['', Validators.required],
    });
    this.firstFormGroup = this._formBuilder.group({
      incumbent: ['', Validators.required],
      id_number: ['', Validators.required],
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
      assets: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      spouses: ['', Validators.required],
      offspring: ['', Validators.required],
      messengers: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      dateofappointment: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  checkStepperValidity() {
    const formGroups = [
      this.optionFormGroup,
      this.dateFormGroup,
      this.firstFormGroup,
      this.secondFormGroup,
      this.thirdFormGroup,
      this.fourthFormGroup,
    ];

    return formGroups.every((group) => group.valid);
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
    // Handle the form submission
    const formData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
      district: this.staticData.district,
      province: this.staticData.province,
      chieftainship: this.staticData.chieftainship,
      id: this.largestId,
      headman_id: this.largestId,
    };

    this.masterService.saveFormDataA(formData).subscribe(
      (response) => {
        this.masterService
          .editHeadStatus(
            this.staticData.id,
            this.optionFormGroup.value,
            this.dateFormGroup.value
          )
          .subscribe((response) => {
            console.log('Form data saved successfully', response);
            // Handle successful form submission (e.g., show a message, reset the form, etc.)
            this.openSnackBar('Headman added successfully', 'close');

            this.router.navigate(['/headman-info', this.largestId]);
          });
      },
      (error) => {
        console.error('Error saving form data', error);
        // Handle error in form submission (e.g., show an error message)
        this.openSnackBar('Error saving form data', 'close');
      }
    );
  }

  onSubmit1() {
    this.optionFormGroup.value;
    this.masterService
      .editHeadStatus(
        this.staticData.id,
        this.optionFormGroup.value,
        this.dateFormGroup.value
      )
      .subscribe((response) => {
        // Handle successful form submission (e.g., show a message, reset the form, etc.)
        this.openSnackBar('Headman updated successfully', 'close');

        this.router.navigate(['/headman-info', this.largestId]);
      });
  }
  loadInitialData() {
    this.masterService.GetAllHeadman().subscribe((items: VillageHead[]) => {
      // Initialize a variable to keep track of the largest id
      console.log(items);
      // Loop through each item in the array
      items.forEach((item: VillageHead) => {
        // Check if the current item's id is larger than the current largestId
        if (item.id !== undefined && +item.id > this.largestId) {
          this.largestId = +item.id + 1;
        }
      });

      // Output the largest id
      console.log('The largest id is:', this.largestId);
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
