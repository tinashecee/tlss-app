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
  selector: 'app-headmen-upload-dialog',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  template: `
    <h2 mat-dialog-title>Upload Headmen Excel File</h2>
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
export class HeadmenUploadDialogComponent implements OnInit {
  fileName: string = '';
  excelData: any[] = [];
  validationErrors: ValidationError[] = [];
  isValid: boolean = false;

  requiredColumns = [
    'id_number',
    'incumbent',
    'district',
    'province',
    'headmanship', // Added headmanship instead of chieftainship
    'gender',
    'dateofbirth',
    'dateofappointment',
  ];

  constructor(
    public dialogRef: MatDialogRef<HeadmenUploadDialogComponent>,
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

      this.excelData = XLSX.utils.sheet_to_json(worksheet);
      this.validateExcelData();
    };
    reader.readAsArrayBuffer(file);
  }

  isValidDate(value: any): boolean {
    if (!value) return false;

    const dateString = value.toString();
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = dateString.match(dateRegex);

    if (!match) {
      if (typeof value === 'number') {
        try {
          const date = new Date((value - 25569) * 86400 * 1000);
          if (!isNaN(date.getTime())) {
            return true;
          }
        } catch (e) {
          return false;
        }
      }
      return false;
    }

    const [_, day, month, year] = match.map(Number);

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

    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  }

  validateExcelData() {
    this.validationErrors = [];

    if (this.excelData.length === 0) {
      this._snackBar.open('The Excel file is empty', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Normalize the Excel headers by removing spaces and converting to lowercase
    const headers = Object.keys(this.excelData[0]).map((h) =>
      h.toLowerCase().replace(/[_\s]/g, '')
    );

    // Create a mapping of normalized headers to actual Excel headers
    const headerMapping: { [key: string]: string } = {
      idnumber: 'id_number',
      incumbent: 'incumbent',
      district: 'district',
      province: 'province',
      headmanship: 'headmanship',
      gender: 'gender',
      dateofbirth: 'dateofbirth',
      dateofappointment: 'dateofappointment',
    };

    // Check for missing columns using normalized headers
    const missingColumns = this.requiredColumns.filter((col) => {
      const normalizedCol = col.toLowerCase().replace(/[_\s]/g, '');
      return !headers.includes(normalizedCol);
    });

    if (missingColumns.length > 0) {
      this._snackBar.open(
        `Missing required columns: ${missingColumns.join(', ')}`,
        'Close',
        { duration: 5000 }
      );
      return;
    }

    // Transform the data to use consistent column names
    this.excelData = this.excelData.map((row) => {
      const transformedRow: any = {};
      Object.keys(row).forEach((key) => {
        const normalizedKey = key.toLowerCase().replace(/[_\s]/g, '');
        const mappedKey = headerMapping[normalizedKey] || key;
        transformedRow[mappedKey] = row[key];
      });
      return transformedRow;
    });

    this.excelData.forEach((row, index) => {
      this.requiredColumns.forEach((column) => {
        if (!row[column] && row[column] !== 0) {
          this.validationErrors.push({
            row: index + 2,
            column,
            message: 'Required field is empty',
          });
        }
      });

      if (row.gender && !['Male', 'Female'].includes(row.gender)) {
        this.validationErrors.push({
          row: index + 2,
          column: 'gender',
          message: 'Gender must be either "Male" or "Female"',
        });
      }

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
            const date = new Date((row[dateField] - 25569) * 86400 * 1000);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            row[dateField] = `${day}/${month}/${year}`;
          }
        }
      });

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

    // Transform data and generate headman_id
    const transformedData = this.excelData.map((row) => {
      // Extract characters 4-9 from id_number (assuming format like 07-006731L07)
      let idPart = '';
      if (row.id_number) {
        // Remove any hyphens and get characters 4-9
        idPart = row.id_number.replace(/-/g, '').substring(3, 9);
      }

      // Create headman_id by combining idPart with headmanship
      const headman_id =
        idPart && row.headmanship
          ? `${idPart}${row.headmanship.toUpperCase()}`
          : '';

      return {
        ...row,
        headman_id, // Add the generated headman_id to the row data
      };
    });

    this.dialogRef.close(transformedData);
  }
}
