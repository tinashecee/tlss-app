import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VillageHead } from '../../../_model/Traditionalleader';

@Component({
  selector: 'app-headmanship-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './headmanship-view.component.html',
  styleUrl: './headmanship-view.component.scss',
})
export class HeadmanshipViewComponent {
  data1: any;
  data: any;
  dataId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the chief ID from route params
    this.activatedRoute.paramMap.subscribe((params) => {
      this.dataId = parseInt(params.get('id') || '', 10); // Parse string to number (handle potential missing param)
      if (this.dataId) {
        this.getData(this.dataId);
      }
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: { name: this.data.headmanship },
    });
  }
  openDialog2(row: any) {
    this.masterService.GetAllHeadman().subscribe((item: VillageHead[]) => {
      item.forEach((e) => {
        console.log(e.headmanship, row);
        if (e.headmanship?.toLowerCase() == row.toLowerCase()) {
          this.router.navigate(['/headman-info', e.id]);
        }
      });
    });
  }
  getData(dataId: number) {
    this.masterService.GetHeadmanshipbyId(dataId).subscribe((data) => {
      this.data1 = data;
      this.data = this.data1[0];
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  standalone: true,
  imports: [MaterialModule],
})
export class DialogContentExampleDialog {
  data1: any;
  data11: any;
  list: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; type: string },
    private masterService: MasterService,
    public dialog: MatDialog
  ) {
    this.getData();
  }
  trackByFn(index: number) {
    return index; // Use a unique identifier for better performance
  }
  getData() {
    this.masterService.getallvillageships().subscribe((dat: any) => {
      this.data1 = dat;
      this.data1.forEach((element: any) => {
        if (element.headmanship.toLowerCase() == this.data.name.toLowerCase()) {
          this.list.push(element);
          console.log(element, this.data.name);
        }
      });
    });
  }
}
