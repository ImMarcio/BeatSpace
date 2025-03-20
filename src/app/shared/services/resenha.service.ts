import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from './like.service';
import { ComentarioResponse } from './comentario.service';
import { LikeResponse } from '../models/LikeResponse';

export interface ResenhaRequest {
texto:string,autor:string, data : string, nota : number , parentId : string , userimg :string , username : string,genre ? :string
}

export interface ResenhaResponse {
  id:number, texto:string,autor:string, data : string, nota : number , parentId : string , userimg :string , username : string, likes : LikeResponse[], comentarios : ComentarioResponse[],
  liked ? : boolean, genre ? :string
 }
 


@Injectable({
  providedIn: 'root'
})
export class ResenhaService {

  base_url = "http://localhost:8081/api/resenhas"
 
   constructor(private http : HttpClient) { }

   getGenres() : Observable<string[]>{
    return this.http.get<string[]>(this.base_url + "/genres")
   }
 
   Add(Resenha : ResenhaRequest):Observable<any>{
       return this.http.post(this.base_url,Resenha)
     }

     GetByUser(userId : string) : Observable<ResenhaResponse[]>{
        return this.http.get<ResenhaResponse[]>(this.base_url + "/user/" + userId)
     }
 
     GetAll(): Observable<{texto:string,autor:string}[]>{
       return this.http.get<{texto:string,autor:string}[]>(this.base_url)
     }
     GetDataAll(): Observable<ResenhaResponse[]>{
      return this.http.get<ResenhaResponse[]>(this.base_url)
    }
 
     GetByAlbumOrPlaylistId(id:string) : Observable<ResenhaResponse[]>{
       return this.http.get<ResenhaResponse[]>(this.base_url + "/parent/" + id)
     }
 
 
     GetAverageGradeById(id:string) : Observable<number>{
       return this.http.get<number>(this.base_url + "/averageById/" + id);
     }
 
     GetRankings(genre : string) : Observable<ResenhaResponse[]>{
      const params = new HttpParams().set("genre", genre); // Correto
       return this.http.get<ResenhaResponse[]>(this.base_url + "/ranking",{params})
     }

     GetMostLiked() : Observable<ResenhaResponse[]>{
        return this.http.get<ResenhaResponse[]>(this.base_url + "/most-liked")
     }


}
