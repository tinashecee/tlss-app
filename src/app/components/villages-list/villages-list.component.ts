import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Villageship } from '../../../_model/Chieftainship';
import { MasterService } from '../../_service/master.service';

@Component({
  selector: 'app-villages-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './villages-list.component.html',
  styleUrl: './villages-list.component.scss',
})
export class VillagesListComponent implements OnInit {
  constructor(private router: Router, private service: MasterService) {}
  dataSource: any;
  data: Villageship[] = [];
  displayColumns: string[] = [
    'villageship_id',
    'villageship',
    'headmanship',
    'chieftainship',
    'province',
    'district',
    'succession_custom',
    'status',
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
    this.router.navigate(['/village-view', row.id]);
  }
  loadInitialData() {
    this.service.getallvillageships().subscribe((item: Villageship[]) => {
      console.log(item);
      this.data = item;
      this.dataSource.data = this.data;
    });
  }
}
