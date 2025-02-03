import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../../_service/master.service';
import { VillageHead } from '../../../_model/Traditionalleader';
import { MatDialog } from '@angular/material/dialog';
import { ChiefsUploadDialogComponent } from '../chiefs-upload-dialog/chiefs-upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-chiefs-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './chiefs-list.component.html',
  styleUrls: ['./chiefs-list.component.scss'],
})
export class ChiefsListComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private service: MasterService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  dataSource!: MatTableDataSource<VillageHead>;
  data: VillageHead[] = [];
  displayColumns: string[] = [
    'chieftainship',
    'incumbent',
    'gender',
    'id_number',
    'dateofappointment',
    'status',
    'province',
    'district',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadInitialData();
  }

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

  clickedRows(row: VillageHead) {
    this.router.navigate(['/chief-info', row.chief_id]);
  }

  loadInitialData() {
    this.service.GetAllChiefs().subscribe((item: VillageHead[]) => {
      console.log(item);
      this.data = item;
      this.dataSource.data = this.data;
    });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(ChiefsUploadDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.uploadChiefs(result).subscribe({
          next: () => {
            this._snackBar.open('Chiefs uploaded successfully', 'Close', {
              duration: 3000,
            });
            this.loadInitialData(); // Refresh the list
          },
          error: (error) => {
            this._snackBar.open(
              'Error uploading chiefs: ' + error.message,
              'Close',
              { duration: 5000 }
            );
          },
        });
      }
    });
  }

  deleteChief(chief: VillageHead) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete chief ${chief.incumbent}?`,
        confirmText: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const chiefId = chief?.chief_id;
        if (chiefId) {
          this.service.deleteChief(chiefId).subscribe({
            next: () => {
              this._snackBar.open('Chief deleted successfully', 'Close', {
                duration: 3000,
              });
              this.loadInitialData(); // Refresh the list
            },
            error: (error) => {
              this._snackBar.open(
                'Error deleting chief: ' + error.message,
                'Close',
                { duration: 5000 }
              );
            },
          });
        }
      }
    });
  }

  editChief(chief: VillageHead) {
    // Navigate to edit page with chief data
    this.router.navigate(['/edit-chief', chief.chief_id]);
  }
}
