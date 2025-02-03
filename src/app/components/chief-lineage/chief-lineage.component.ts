import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { VillageHead } from '../../../_model/Traditionalleader';
import { Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-chief-lineage',
  standalone: true,
  imports: [MaterialModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './chief-lineage.component.html',
  styleUrl: './chief-lineage.component.scss',
})
export class ChiefLineageComponent {
  staticData: any;
  data: VillageHead[] = [];
  dataSource!: MatTableDataSource<VillageHead>;
  constructor(private masterService: MasterService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.staticData = navigation?.extras?.state?.['data'];
  }
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadInitialData() {
    this.masterService.GetAllChiefs().subscribe((item: VillageHead[]) => {
      item.forEach((e) => {
        if (
          e.chieftainship?.toLowerCase() ==
          this.staticData.chieftainship.toLowerCase()
        ) {
          this.data.push(e);
        }
      });
      this.dataSource.data = this.data;
    });
  }
}
