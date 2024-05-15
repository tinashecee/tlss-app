import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-headmanship-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './headmanship-list.component.html',
  styleUrl: './headmanship-list.component.scss',
})
export class HeadmanshipListComponent implements OnInit {
  constructor(private router: Router) {}
  dataSource: any;
  data = [
    {
      headmanship_id: 'id',
      headmanship: 'Chieftainship 1',
      province: 'Manicaland',
      succession_custom: 'Patriachy',
      mutupo: 'Nyati',
    },
  ];
  displayColumns: string[] = [
    'Headmanship',
    'Province',
    'Mutopo',
    'Succession Custom',
    'Number of Villages',
    'Number of Wards',
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
    this.router.navigate(['/headmanship-view', '1']);
  }
}
