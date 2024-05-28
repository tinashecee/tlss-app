export interface VillageHead {
  id: number;
  chief_id: string;
  id_number: string;
  incumbent: string;
  district: string;
  province: string;
  chieftainship: string;
  headmanship: string;
  villageship: string;
  mutupo: string;
  ecnumber: string;
  gender: string;
  dateofbirth: string; // Consider using a Date type if you can convert this format
  dateofappointment: string; // Same as above, consider Date type
  status: string;
  bank: string;
  accountnumber: string;
  contactnumber: string;
  nextofkin: string;
  biosignature: string;
  picture: string;
  spouses: string;
  offspring: string;
  car_reg_no: string;
  dateofissue: string; // Same as above, consider Date type
  dateofdeathorremoval: string; // Same as above, consider Date type
  physicalladdress: string;
}
