import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ComentarioRequest {
  texto:string,autor:string, data : string, resenhaId : number, userimg :string , username : string
}

export interface ComentarioResponse{
  id:number , texto:string,autor:string, data : string, userimg :string , username : string
}

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  base_url = "http://localhost:8081/api/comentarios"

  constructor(private http : HttpClient) { }

  Add(comentario : ComentarioRequest):Observable<any>{
      return this.http.post(this.base_url + "/add",comentario)
    }

  
}
