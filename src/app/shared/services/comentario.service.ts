import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Comentario {
  texto:string,autor:string, data : string, nota : number , parentId : string , userimg :string , username : string
}

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  base_url = "http://localhost:8081/api/comentarios"

  constructor(private http : HttpClient) { }

  Add(comentario : Comentario):Observable<any>{
      return this.http.post(this.base_url,comentario)
    }

    GetAll(): Observable<{texto:string,autor:string}[]>{
      return this.http.get<{texto:string,autor:string}[]>(this.base_url)
    }

    GetByAlbumOrPlaylistId(id:string) : Observable<Comentario[]>{
      return this.http.get<Comentario[]>(this.base_url + "/parent/" + id)
    }

}
