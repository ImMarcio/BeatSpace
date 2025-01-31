import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  static token = ""
  base_url = 'https://accounts.spotify.com/api/';
  api_url = 'https://api.spotify.com/v1/';
  

  constructor(private http : HttpClient) { }

 
  getToken(code: string): Observable<any> {
    return this.http.post(`http://localhost:8080/api/spotify/token`, { code });
  }


  getProfile() : Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + btoa(`${JSON.parse(localStorage.getItem("token") ?? "").access_token}`),
    });

    return this.http.get(this.api_url + "me",{headers : headers})
  }


  getAlbumReleases():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + btoa(`${JSON.parse(localStorage.getItem("token") ?? "").access_token}`),
    });
    return this.http.get("https://api.spotify.com/v1/browse/new-releases",{
      headers : headers
    })
  }



}
