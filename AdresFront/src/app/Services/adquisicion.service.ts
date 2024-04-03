
import { Adquisicion } from './../Interfaces/adquisicion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Observable } from 'rxjs';
import { Historial } from '../Interfaces/historial';  


@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "Adquisicion/";

  constructor(private http:HttpClient) { 
  }

  getList():Observable<Adquisicion[]>{
    return this.http.get<Adquisicion[]>(`${this.apiUrl}lista`);
  }

  getHistorial():Observable<Historial[]>{
    return this.http.get<Historial[]>(`${this.apiUrl}historial`);
  }

  add(modelo:Adquisicion):Observable<Adquisicion[]>{
    return this.http.post<Adquisicion[]>(`${this.apiUrl}guardar`, modelo);
  }

  update(modelo:Adquisicion):Observable<Adquisicion[]>{
    return this.http.put<Adquisicion[]>(`${this.apiUrl}editar`, modelo);
  }

  delete(id:number):Observable<void[]>{
    return this.http.delete<void[]>(`${this.apiUrl}eliminar/${id}`);
  }
}
