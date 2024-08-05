import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Villageship } from '../../_model/Chieftainship';
import { VillageHead } from '../../_model/Traditionalleader';
import { Observable } from 'rxjs/internal/Observable';

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
      'http://localhost:3000/villageship/?id=' + id
    ); // Template literal for URL construction
  }

  //
  saveFormData(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/chiefs', data);
  }
  saveFormDataA(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/headman', data);
  }

  // New method to edit chief status
  editChiefStatus(id: number, newStatus: any, dt: any): Observable<any> {
    const url = `http://localhost:3000/chiefs/${id}`;
    return this.http.patch(url, {
      status: newStatus.status,
      dateofdeathorremoval: dt.dateofdeathorremoval,
    });
  }
  editHeadStatus(id: number, newStatus: any, dt: any): Observable<any> {
    const url = `http://localhost:3000/headman/${id}`;
    return this.http.patch(url, {
      status: newStatus.status,
      dateofdeathorremoval: dt.dateofdeathorremoval,
    });
  }

  haveaccess() {
    return true;
  }
}
