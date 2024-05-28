import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { VillageHead } from '../../../_model/Traditionalleader';
import { MasterService } from '../../_service/master.service';
import { Villageship } from '../../../_model/Chieftainship';

@Component({
  selector: 'app-chieftainship-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './chieftainship-list.component.html',
  styleUrl: './chieftainship-list.component.scss',
})
export class ChieftainshipListComponent implements OnInit {
  constructor(private router: Router, private service: MasterService) {}
  dataSource: any;
  data: Villageship[] = [];
  displayColumns: string[] = [
    'chieftainship_id',
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
    this.router.navigate(['/chieftainship-view', row.id]);
  }
  loadInitialData() {
    this.service.getallchieftainships().subscribe((item: Villageship[]) => {
      console.log(item);
      this.data = item;
      this.dataSource.data = this.data;
    });
  }
}
