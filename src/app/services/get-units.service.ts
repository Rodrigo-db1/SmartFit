import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UnitsResponse} from '../types/units-response.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetUnitsService { 
    readonly apiUrl ="https://test-frontend-developer.s3.amazonaws.com/data/locations.json"; 

  constructor(private httpCliente: HttpClient) {
    
   } 

  getAllUnits(): Observable<UnitsResponse>{ 
   return this.httpCliente.get<UnitsResponse>(this.apiUrl);
  }
}
