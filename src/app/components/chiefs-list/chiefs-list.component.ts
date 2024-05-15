import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-chiefs-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './chiefs-list.component.html',
  styleUrl: './chiefs-list.component.scss',
})
export class ChiefsListComponent implements OnInit {
  constructor(private router: Router) {}
  dataSource: any;
  data = [
    {
      chieftainship: 'Chieftainship 1',
      firstname: 'First Name 1',
      lastname: 'Last Name 1',
      gender: 'Gender 1',
      ecnumber: 'EC Number 1',
      dob: 'DOB 1',
      date_of_appointment: 'Date Of Appointment 1',
      status: 'Status 1',
    },
    {
      chieftainship: 'Chieftainship 2',
      firstname: 'First Name 2',
      lastname: 'Last Name 2',
      gender: 'Gender 2',
      ecnumber: 'EC Number 2',
      dob: 'DOB 2',
      date_of_appointment: 'Date Of Appointment 2',
      status: 'Status 2',
    },
    {
      chieftainship: 'Chieftainship 3',
      firstname: 'First Name 3',
      lastname: 'Last Name 3',
      gender: 'Gender 3',
      ecnumber: 'EC Number 3',
      dob: 'DOB 3',
      date_of_appointment: 'Date Of Appointment 3',
      status: 'Status 3',
    },
    {
      chieftainship: 'Chieftainship 4',
      firstname: 'First Name 4',
      lastname: 'Last Name 4',
      gender: 'Gender 4',
      ecnumber: 'EC Number 4',
      dob: 'DOB 4',
      date_of_appointment: 'Date Of Appointment 4',
      status: 'Status 4',
    },
    {
      chieftainship: 'Chieftainship 5',
      firstname: 'First Name 5',
      lastname: 'Last Name 5',
      gender: 'Gender 5',
      ecnumber: 'EC Number 5',
      dob: 'DOB 5',
      date_of_appointment: 'Date Of Appointment 5',
      status: 'Status 5',
    },
  ];
  displayColumns: string[] = [
    'Chieftainship',
    'Name',
    'Gender',
    'ecnumber',
    'Dob',
    'Date Of Appointment',
    'Status',
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
    this.router.navigate(['/chief-info', '1']);
  }
}
