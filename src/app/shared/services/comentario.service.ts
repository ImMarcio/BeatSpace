import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  base_url = "http://localhost:8081/api/comentarios"

  constructor(private http : HttpClient) { }

  Add(comentario : {texto:string,autor:string}):Observable<any>{
      return this.http.post(this.base_url,comentario)
    }

    GetAll(): Observable<{texto:string,autor:string}[]>{
      return this.http.get<{texto:string,autor:string}[]>(this.base_url)
    }

}
