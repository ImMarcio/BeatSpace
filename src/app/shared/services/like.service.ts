import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Like{
  resenhaId : number,
  userId : string,
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http : HttpClient) { }

  base_url = "http://localhost:8081/api/likes"


  addLike(like : Like) : Observable<string>{
    return this.http.post<string>(this.base_url + "/add",like)
  }

  unlike(resenha_id : number , user_id : string): Observable<string>{
    let params = new HttpParams()
    .set("resenhaId", resenha_id.toString()) // Convert number to string
    .set("userId", user_id);

    return this.http.delete<string>(this.base_url + "/unlike", {params})
  }
}
