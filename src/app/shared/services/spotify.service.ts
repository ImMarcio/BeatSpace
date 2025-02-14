import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseTopTracks, Track } from '../models/Track';
import { TopArtistsResponse } from '../models/Artist';
import { User } from '../models/User';
import { ResponseSearchAlbum } from '../models/ResponseSearchAlbum';
import { ResponseSearchTrack } from '../models/ResponseSearchTrack';
import { Album } from '../models/Album';
import { Playlist, PlaylistsResponse } from '../models/Playlist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  base_url = 'https://accounts.spotify.com/api/';
  api_url = 'https://api.spotify.com/v1/';
  server_url : string = 'http://localhost:8081/api/spotify'
  

  constructor(private http : HttpClient) { }

 
  getToken(code: string): Observable<any> {
    return this.http.post(`http://localhost:8081/api/spotify/token`, { code });
  }


  getCurrentUser() : Observable<User>{
    return this.http.get<User>('http://localhost:8081/api/spotify/user/me')
  }


  getAlbumReleases():Observable<any>{
    return this.http.get("http://localhost:8081/api/spotify/albuns/new-releases")
  }

  getTracksRecommendations(): Observable<any>{
    return this.http.get("http://localhost:8081/api/spotify/tracks/recommendations")
  }

  getTopArtists(): Observable<TopArtistsResponse>{
    return this.http.get<TopArtistsResponse>("http://localhost:8081/api/spotify/artists/top")
  }

  getTopTracks(): Observable<ResponseTopTracks>{
    return this.http.get<ResponseTopTracks>("http://localhost:8081/api/spotify/tracks/top")
  }

  search(query:string, type:string) : Observable<ResponseSearchAlbum | ResponseSearchTrack>{
      const params =  new HttpParams().append("query",query).append("type",type)
      switch(type){
        case "track" : {
          return this.http.get<ResponseSearchTrack>('http://localhost:8081/api/spotify/search', {
            params
          })
        }
        case "album" :{
          return this.http.get<ResponseSearchAlbum>('http://localhost:8081/api/spotify/search', {
            params
          })
        }
        default : {
          return this.http.get<ResponseSearchAlbum>('http://localhost:8081/api/spotify/search', {
            params
          })
        }
      }
     
  }

  getCurrentUserPlaylists(): Observable<PlaylistsResponse>{
    return this.http.get<PlaylistsResponse>("http://localhost:8081/api/spotify/user/me/playlists")
  }


  getAlbum(id:string):Observable<Album>{
    return this.http.get<Album>(`http://localhost:8081/api/spotify/albums/${id}`)
  }

  getTrack(id:string): Observable<Track>{
    return this.http.get<Track>(`http://localhost:8081/api/spotify/tracks/${id}`)
  }


}
