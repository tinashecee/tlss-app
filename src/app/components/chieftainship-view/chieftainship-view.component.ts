import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { VillageHead } from '../../../_model/Traditionalleader';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-chieftainship-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './chieftainship-view.component.html',
  styleUrl: './chieftainship-view.component.scss',
})
export class ChieftainshipViewComponent {
  data1: any;
  data: any;
  dataId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: { name: this.data.chieftainship, type: 'Headmanships' },
    });
  }
  openDialog1() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: { name: this.data.chieftainship, type: 'Villages' },
    });
  }
  ngOnInit() {
    // Get the chief ID from route params
    this.activatedRoute.paramMap.subscribe((params) => {
      this.dataId = parseInt(params.get('id') || '', 10); // Parse string to number (handle potential missing param)
      if (this.dataId) {
        this.getData(this.dataId);
      }
    });
  }
  navigateToHistory() {
    this.router.navigate(['/chief-lineage']);
  }

  getData(dataId: number) {
    this.masterService.GetChieftainshipbyId(dataId).subscribe((data) => {
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
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.getData();
  }
  trackByFn(index: number) {
    return index; // Use a unique identifier for better performance
  }
  getData() {
    if (this.data.type == 'Headmanships') {
      this.masterService.getallheadmanships().subscribe((dat: any) => {
        this.data1 = dat;
        this.data1.forEach((element: any) => {
          console.log(element.chieftainship, this.data.name);
          if (
            element.chieftainship.toLowerCase() == this.data.name.toLowerCase()
          ) {
            this.list.push(element);
            console.log(element, this.data.name);
          }
        });
      });
    }
    if (this.data.type == 'Villages') {
      this.masterService.getallvillageships().subscribe((dat: any) => {
        this.data1 = dat;
        this.data1.forEach((element: any) => {
          console.log(element.chieftainship, this.data.name);
          if (
            element.chieftainship.toLowerCase() == this.data.name.toLowerCase()
          ) {
            this.list.push(element);
            console.log(element, this.data.name);
          }
        });
      });
    }
  }
  clickedRows(row: any) {
    this.router.navigate(['/headmanship-view', row.id]);
  }
}
