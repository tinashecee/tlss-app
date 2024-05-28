import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { VillageHead } from '../../../_model/Traditionalleader';
import { MasterService } from '../../_service/master.service';

@Component({
  selector: 'app-headman-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './headman-list.component.html',
  styleUrl: './headman-list.component.scss',
})
export class HeadmanListComponent {
  constructor(private router: Router, private service: MasterService) {}
  dataSource: any;
  data: VillageHead[] = [];
  displayColumns: string[] = [
    'chieftainship',
    'headmanship',
    'incumbent',
    'gender',
    'id_number',
    'dateofappointment',
    'status',
    'province',
    'district',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
}
