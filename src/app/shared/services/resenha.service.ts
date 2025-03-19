import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from './like.service';
import { ComentarioResponse } from './comentario.service';

export interface ResenhaRequest {
texto:string,autor:string, data : string, nota : number , parentId : string , userimg :string , username : string,
}

export interface ResenhaResponse {
  id:number, texto:string,autor:string, data : string, nota : number , parentId : string , userimg :string , username : string, totalLikes: number, comentarios : ComentarioResponse[], liked : boolean
 }
 


@Injectable({
  providedIn: 'root'
})
export class ResenhaService {

  base_url = "http://localhost:8081/api/resenhas"
 
   constructor(private http : HttpClient) { }
 
   Add(Resenha : ResenhaRequest):Observable<any>{
       return this.http.post(this.base_url,Resenha)
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
 
     GetRankings() : Observable<ResenhaResponse[]>{
       return this.http.get<ResenhaResponse[]>(this.base_url + "/ranking")
     }

     GetMostLiked() : Observable<ResenhaResponse[]>{
        return this.http.get<ResenhaResponse[]>(this.base_url + "/most-liked")
     }


}
