import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ValidationError {
  row: number;
  column: string;
  message: string;
}

@Component({
  selector: 'app-chiefs-upload-dialog',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  template: `
    <h2 mat-dialog-title>Upload Chiefs Excel File</h2>
    <mat-dialog-content>
      <div class="upload-container">
        <input
          type="file"
          #fileInput
          (change)="onFileChange($event)"
          accept=".xlsx, .xls"
          style="display: none"
        />
        <button mat-raised-button color="primary" (click)="fileInput.click()">
          <mat-icon>attach_file</mat-icon>
          Select Excel File
        </button>
        <span *ngIf="fileName" class="file-name">{{ fileName }}</span>
      </div>

      <div *ngIf="validationErrors.length > 0" class="validation-errors">
        <h3>Validation Errors</h3>
        <mat-list>
          <mat-list-item *ngFor="let error of validationErrors">
            Row {{ error.row }}: {{ error.column }} - {{ error.message }}
          </mat-list-item>
        </mat-list>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="!isValid || !excelData"
        (click)="uploadData()"
      >
        Upload
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .upload-container {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
      }
      .file-name {
        margin-left: 10px;
      }
      .validation-errors {
        margin-top: 20px;
        color: #f44336;
      }
    `,
  ],
})
export class ChiefsUploadDialogComponent implements OnInit {
  fileName: string = '';
  excelData: any[] = [];
  validationErrors: ValidationError[] = [];
  isValid: boolean = false;

  requiredColumns = [
    'id_number',
    'incumbent',
    'district',
    'province',
    'chieftainship',
    'gender',
    'dateofbirth',
    'dateofappointment',
  ];

  constructor(
    public dialogRef: MatDialogRef<ChiefsUploadDialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileName = file.name;
    this.validationErrors = [];
    this.isValid = false;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to JSON
      this.excelData = XLSX.utils.sheet_to_json(worksheet);

      // Validate the data
      this.validateExcelData();
    };
    reader.readAsArrayBuffer(file);
  }

  isValidDate(value: any): boolean {
    // If value is not provided, return false
    if (!value) {
      return false;
    }

    // Convert to string if it's not already a string
    const dateString = value.toString();

    // Check if the date string matches any of our expected formats
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = dateString.match(dateRegex);

    if (!match) {
      // Try to handle Excel date number format
      if (typeof value === 'number') {
        try {
          // Convert Excel date number to JavaScript Date
          const date = new Date((value - 25569) * 86400 * 1000);
          // Check if it's a valid date
          if (!isNaN(date.getTime())) {
            return true;
          }
        } catch (e) {
          return false;
        }
      }
      return false;
    }

    // Extract day, month, and year from the matched groups
    const [_, day, month, year] = match.map(Number);

    // Validate ranges
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      return false;
    }

    // Check if it's a valid date (handles leap years and month lengths)
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  }

  validateExcelData() {
    this.validationErrors = [];

    // Check if file is empty
    if (this.excelData.length === 0) {
      this._snackBar.open('The Excel file is empty', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Get column headers from first row
    const headers = Object.keys(this.excelData[0]).map((h) => h.toLowerCase());

    // Validate required columns exist
    const missingColumns = this.requiredColumns.filter(
      (col) => !headers.includes(col.toLowerCase())
    );

    if (missingColumns.length > 0) {
      this._snackBar.open(
        `Missing required columns: ${missingColumns.join(', ')}`,
        'Close',
        { duration: 5000 }
      );
      return;
    }

    // Validate each row
    this.excelData.forEach((row, index) => {
      // Check required fields
      this.requiredColumns.forEach((column) => {
        if (!row[column] && row[column] !== 0) {
          this.validationErrors.push({
            row: index + 2,
            column,
            message: 'Required field is empty',
          });
        }
      });

      // Validate gender
      if (row.gender && !['Male', 'Female'].includes(row.gender)) {
        this.validationErrors.push({
          row: index + 2,
          column: 'gender',
          message: 'Gender must be either "Male" or "Female"',
        });
      }

      // Validate dates and convert them to proper format
      [
        'dateofbirth',
        'dateofappointment',
        'dateofissue',
        'dateofdeathorremoval',
      ].forEach((dateField) => {
        if (row[dateField]) {
          if (!this.isValidDate(row[dateField])) {
            this.validationErrors.push({
              row: index + 2,
              column: dateField,
              message: 'Invalid date format. Must be dd/mm/yyyy',
            });
          } else if (typeof row[dateField] === 'number') {
            // Convert Excel date to proper format
            const date = new Date((row[dateField] - 25569) * 86400 * 1000);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            row[dateField] = `${day}/${month}/${year}`;
          }
        }
      });

      // Validate ID number is unique
      const idCount = this.excelData.filter(
        (r) => r.id_number === row.id_number
      ).length;
      if (idCount > 1) {
        this.validationErrors.push({
          row: index + 2,
          column: 'id_number',
          message: 'Duplicate ID number found',
        });
      }
    });

    this.isValid = this.validationErrors.length === 0;

    if (this.isValid) {
      this._snackBar.open('Validation successful', 'Close', { duration: 3000 });
    }
  }

  uploadData() {
    if (!this.isValid) return;

    // Transform data and generate chief_id
    const transformedData = this.excelData.map((row) => {
      // Extract characters 4-9 from id_number (assuming format like 07-006731L07)
      let idPart = '';
      if (row.id_number) {
        // Remove any hyphens and get characters 4-9
        idPart = row.id_number.replace(/-/g, '').substring(3, 9);
      }

      // Create chief_id by combining idPart with chieftainship
      const chief_id =
        idPart && row.chieftainship
          ? `${idPart}${row.chieftainship.toUpperCase()}`
          : '';

      return {
        ...row,
        chief_id, // Add the generated chief_id to the row data
      };
    });

    this.dialogRef.close(transformedData);
  }
}
