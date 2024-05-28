import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../../_service/master.service';
import { VillageHead } from '../../../_model/Traditionalleader';

@Component({
  selector: 'app-chiefs-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './chiefs-list.component.html',
  styleUrls: ['./chiefs-list.component.scss'],
})
export class ChiefsListComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private service: MasterService) {}

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
}
