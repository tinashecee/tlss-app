import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { VillageHead } from '../../../_model/Traditionalleader';
import { MasterService } from '../../_service/master.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeadmenUploadDialogComponent } from '../headmen-upload-dialog/headmen-upload-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-headman-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './headman-list.component.html',
  styleUrl: './headman-list.component.scss',
})
export class HeadmanListComponent {
  constructor(
    private router: Router,
    private service: MasterService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  dataSource: any;
  data: VillageHead[] = [];
  displayColumns: string[] = [
    'incumbent',
    'id_number',
    'province',
    'district',
    'chieftainship',
    'headmanship',
    'status',
    'dateofappointment',
    'gender',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  requiredColumns = [
    'id_number',
    'incumbent',
    'district',
    'province',
    'headmanship',
    'gender',
    'dateofbirth',
    'dateofappointment',
  ];

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.loadInitialData();
  }
  clickedRows(row: any) {
    this.router.navigate(['/headman-info', row.id]);
  }
  loadInitialData() {
    this.service.GetAllHeadman().subscribe((item: VillageHead[]) => {
      console.log(item);
      this.data = item;
      this.dataSource.data = this.data;
    });
  }
  openUploadDialog() {
    const dialogRef = this.dialog.open(HeadmenUploadDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.uploadHeadmen(result).subscribe({
          next: () => {
            this._snackBar.open('Headmen uploaded successfully', 'Close', {
              duration: 3000,
            });
            this.loadInitialData();
          },
          error: (error) => {
            this._snackBar.open(
              'Error uploading headmen: ' + error.message,
              'Close',
              { duration: 5000 }
            );
          },
        });
      }
    });
  }

  deleteHeadman(headman: VillageHead) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete headman ${headman.incumbent}?`,
        confirmText: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const headmanId = headman.headman_id;
        if (headmanId) {
          this.service.deleteHeadman(headmanId).subscribe({
            next: () => {
              this._snackBar.open('Headman deleted successfully', 'Close', {
                duration: 3000,
              });
              this.loadInitialData();
            },
            error: (error) => {
              this._snackBar.open(
                'Error deleting headman: ' + error.message,
                'Close',
                { duration: 5000 }
              );
            },
          });
        }
      }
    });
  }

  editHeadman(headman: VillageHead) {
    this.router.navigate(['/edit-headman', headman.headman_id]);
  }
}
