import { MatDialog } from '@angular/material/dialog';
import { HeadmenUploadDialogComponent } from '../headmen-upload-dialog/headmen-upload-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export class HeadmenListComponent {
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

  deleteHeadman(headman: any) {
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
        this.service.deleteHeadman(headman.headman_id).subscribe({
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
    });
  }

  editHeadman(headman: any) {
    this.router.navigate(['/edit-headman', headman.headman_id]);
  }
}
