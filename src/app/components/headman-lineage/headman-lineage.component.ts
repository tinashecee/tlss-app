import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { VillageHead } from '../../../_model/Traditionalleader';
@Component({
  selector: 'app-headman-lineage',
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
  templateUrl: './headman-lineage.component.html',
  styleUrl: './headman-lineage.component.scss',
})
export class HeadmanLineageComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = [
    'incumbent',
    'headmanship',
    'dateofappointment',
    'dateofdeathorremoval',
    'status',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: VillageHead | null;
}

const ELEMENT_DATA: VillageHead[] = [
  {
    id: 1,
    chief_id: '',
    id_number: '63-104132x15',
    incumbent: 'LAWRENCE CHIGARIRO',
    district: 'Mazowe',
    province: 'Mashonaland Central',
    headmanship: 'CHIWESHE',
    mutupo: 'SHAVA MUTENHESANWA',
    ecnumber: 'EC123456',
    gender: 'Male',
    dateofbirth: '9/28/1960',
    dateofappointment: '12/10/2014',
    status: 'REMOVED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263772420221',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '12/15/2021',
    physicalladdress: 'Ethel Grange Farm Nhangura',
  },
  {
    id: 2,
    chief_id: '',
    id_number: '63-204582x18',
    incumbent: 'JOHN DOE',
    district: 'Bindura',
    province: 'Mashonaland Central',
    chieftainship: 'NYAMASANGA',
    mutupo: 'SHAVA MUKONORI',
    ecnumber: 'EC654321',
    gender: 'Male',
    dateofbirth: '1/15/1955',
    dateofappointment: '5/22/2010',
    status: 'DECEASED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263773456789',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '3/10/2018',
    physicalladdress: 'Plot 34 Chiweshe',
  },
  {
    id: 3,
    chief_id: '',
    id_number: '63-305123x20',
    incumbent: 'PETER MUKANDATSAMA',
    district: 'Shamva',
    province: 'Mashonaland Central',
    chieftainship: 'NYAMANDLOVU',
    mutupo: 'SHAVA MHARA',
    ecnumber: 'EC987654',
    gender: 'Male',
    dateofbirth: '3/10/1965',
    dateofappointment: '7/30/2012',
    status: 'REMOVED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263774123456',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '11/5/2020',
    physicalladdress: 'Shamva Gold Mine',
  },
  {
    id: 4,
    chief_id: '',
    id_number: '63-405678x25',
    incumbent: 'MICHAEL KADUNGURE',
    district: 'Guruve',
    province: 'Mashonaland Central',
    chieftainship: 'KARUYANA',
    mutupo: 'SHAVA MABVUDZI',
    ecnumber: 'EC112233',
    gender: 'Male',
    dateofbirth: '12/8/1950',
    dateofappointment: '10/15/2005',
    status: 'DECEASED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263775678910',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '8/12/2017',
    physicalladdress: 'Village 8A Guruve',
  },
  {
    id: 5,
    chief_id: '',
    id_number: '63-506789x30',
    incumbent: 'RICHARD ZVIMBA',
    district: 'Muzarabani',
    province: 'Mashonaland Central',
    chieftainship: 'MUSANA',
    mutupo: 'SHAVA GUMBORENDERE',
    ecnumber: 'EC334455',
    gender: 'Male',
    dateofbirth: '7/19/1969',
    dateofappointment: '2/25/2016',
    status: 'REMOVED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263776789012',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '9/30/2022',
    physicalladdress: 'Muzarabani Growth Point',
  },
  {
    id: 6,
    chief_id: '',
    id_number: '63-607890x35',
    incumbent: 'JAMES KABONGO',
    district: 'Rushinga',
    province: 'Mashonaland Central',
    chieftainship: 'MATEU',
    mutupo: 'SHAVA NGWENA',
    ecnumber: 'EC556677',
    gender: 'Male',
    dateofbirth: '5/4/1948',
    dateofappointment: '8/18/2009',
    status: 'DECEASED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263777890123',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '4/25/2021',
    physicalladdress: 'Rushinga Village 14',
  },
  {
    id: 7,
    chief_id: '',
    id_number: '63-708901x40',
    incumbent: 'ROBERT NDHLOVU',
    district: 'Mt. Darwin',
    province: 'Mashonaland Central',
    chieftainship: 'NDHLOVU',
    mutupo: 'SHAVA HUKURU',
    ecnumber: 'EC778899',
    gender: 'Male',
    dateofbirth: '11/22/1953',
    dateofappointment: '4/12/2015',
    status: 'REMOVED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263778901234',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '6/18/2019',
    physicalladdress: 'Darwin Center',
  },
  {
    id: 8,
    chief_id: '',
    id_number: '63-809012x45',
    incumbent: 'SAMSON GUMBO',
    district: 'Centenary',
    province: 'Mashonaland Central',
    chieftainship: 'GUMBO',
    mutupo: 'SHAVA NEMBA',
    ecnumber: 'EC990011',
    gender: 'Male',
    dateofbirth: '2/14/1962',
    dateofappointment: '6/20/2013',
    status: 'DECEASED',
    bank: '',
    accountnumber: '',
    contactnumber: '+263779012345',
    nextofkin: '',
    biosignature: '',
    picture: '',
    spouses: '',
    offspring: '',
    car_reg_no: '',
    dateofissue: '',
    dateofdeathorremoval: '11/11/2022',
    physicalladdress: 'Centenary Farm 5',
  },
];
