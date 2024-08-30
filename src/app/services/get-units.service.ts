import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UnitsResponse} from '../types/units-response.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetUnitsService { //Obter Unidades
    readonly apiUrl ="https://test-frontend-developer.s3.amazonaws.com/data/locations.json"; 

  constructor(private httpCliente: HttpClient) { } //construtor para chamadas Http

  getAllUnits(): Observable<UnitsResponse>{ //trabalhar com operações assíncronas, como requisições HTTP
   return this.httpCliente.get<UnitsResponse>(this.apiUrl);
  }
}
