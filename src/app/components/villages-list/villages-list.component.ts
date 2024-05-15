import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-villages-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './villages-list.component.html',
  styleUrl: './villages-list.component.scss',
})
export class VillagesListComponent implements OnInit {
  constructor(private router: Router) {}
  dataSource: any;
  data = [
    {
      village_id: 'id',
      village: 'Village 1',
      province: 'Province 1',
      district: 'District 1',
      ward: 'Ward 1',
      succession_custom: 'Patriachy',
      mutupo: 'Nyati',
      households: 100,
    },
  ];
  displayColumns: string[] = [
    'Village',
    'Province',
    'Mutopo',
    'Succession Custom',
    'Ward',
    'District',
    'Number of Households',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }
  clickedRows(row: any) {
    this.router.navigate(['/village-view', '1']);
  }
}
