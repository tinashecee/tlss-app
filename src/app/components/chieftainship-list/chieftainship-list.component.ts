import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-chieftainship-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './chieftainship-list.component.html',
  styleUrl: './chieftainship-list.component.scss',
})
export class ChieftainshipListComponent implements OnInit {
  constructor(private router: Router) {}
  dataSource: any;
  data = [
    {
      chieftainship_id: 'id',
      chieftainship: 'Chieftainship 1',
      province: 'Manicaland',
      succession_custom: 'Patriachy',
      mutupo: 'Nyati',
    },
  ];
  displayColumns: string[] = [
    'Chieftainship',
    'Province',
    'Mutopo',
    'Succession Custom',
    'Number of Headman',
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
    this.router.navigate(['/chieftainship-view', '1']);
  }
}
