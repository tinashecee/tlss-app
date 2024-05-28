import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Villageship } from '../../_model/Chieftainship';
import { VillageHead } from '../../_model/Traditionalleader';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  getallvillageships() {
    return this.http.get<Villageship[]>('http://localhost:3000/villageship');
  }
  getallheadmanships() {
    return this.http.get<Villageship[]>('http://localhost:3000/headmanships');
  }
  getallchieftainships() {
    return this.http.get<Villageship[]>('http://localhost:3000/chieftainships');
  }

  GetAllChiefs() {
    return this.http.get<VillageHead[]>('http://localhost:3000/chiefs');
  }
  GetAllHeadman() {
    return this.http.get<VillageHead[]>('http://localhost:3000/headman');
  }
  GetAllVillagehead() {
    return this.http.get<VillageHead[]>('http://localhost:3000/villageheads');
  }

  GetChiefbyId(id: number) {
    // GetChiefbycode is renamed to GetChiefbyId with number parameter
    return this.http.get<VillageHead>('http://localhost:3000/chiefs/?id=' + id); // Template literal for URL construction
  }

  GetHeadmanbyId(id: number) {
    // GetChiefbycode is renamed to GetChiefbyId with number parameter
    return this.http.get<VillageHead>(
      'http://localhost:3000/headman/?id=' + id
    ); // Template literal for URL construction
  }
  GetVillageheadbyId(id: number) {
    // GetChiefbycode is renamed to GetChiefbyId with number parameter
    return this.http.get<VillageHead>(
      'http://localhost:3000/villageheads/?id=' + id
    ); // Template literal for URL construction
  }

  GetChieftainshipbyId(id: number) {
    // GetChiefbycode is renamed to GetChiefbyId with number parameter
    return this.http.get<VillageHead>(
      'http://localhost:3000/chieftainships/?id=' + id
    ); // Template literal for URL construction
  }
  GetHeadmanshipbyId(id: number) {
    // GetChiefbycode is renamed to GetChiefbyId with number parameter
    return this.http.get<VillageHead>(
      'http://localhost:3000/headmanships/?id=' + id
    ); // Template literal for URL construction
  }
  GetVillageshipbyId(id: number) {
    // GetChiefbycode is renamed to GetChiefbyId with number parameter
    return this.http.get<VillageHead>(
      'http://localhost:3000/villageheads/?id=' + id
    ); // Template literal for URL construction
  }
  haveaccess() {
    return true;
  }
}
