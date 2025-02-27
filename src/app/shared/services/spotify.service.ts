import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseTracks, Track } from '../models/Track';
import { TopArtistsResponse } from '../models/Artist';
import { User } from '../models/User';
import { Albums, ResponseSearchAlbum } from '../models/ResponseSearchAlbum';
import { ResponseSearchTrack } from '../models/ResponseSearchTrack';
import { Album } from '../models/Album';
import { Playlist, PlaylistsResponse } from '../models/Playlist';


export interface UriTrack {
  uri : string
}

export interface ResponseSavedAlbuns{
  added_at : string;
  albums : Album
}
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  base_url = 'https://accounts.spotify.com/api/';
  api_url = 'https://api.spotify.com/v1/';
  server_url : string = 'http://localhost:8081/api/spotify'
  

  constructor(private http : HttpClient) { }




  addSavedAlbuns(request : {ids : string[]}) : Observable<any>{
    return this.http.put<any>(this.server_url + "/albuns/add" , request)
  }

  removeSavedAlbuns(request: { ids: string[] }): Observable<any> {
    const body = { ids: request.ids };  // Enviando os IDs no corpo da requisição
    return this.http.request<any>('DELETE', `${this.server_url}/albuns/remove`, { body});
  }
  
  getSavedAlbuns() : Observable<any>{
    return this.http.get<any>(this.server_url + "/albuns/saved")
  }
 

 

  getToken(code: string): Observable<any> {
    return this.http.post(`http://localhost:8081/api/spotify/token`, { code });
  }

  getRefreshToken(refresh_token:string): Observable<any>{
    return this.http.post(this.server_url + '/refresh-token',{refresh_token})
  }

  getPlaylist(id: string):Observable<Playlist>{
    return this.http.get<Playlist>(this.server_url + "/playlists/" + id)
  }


  createPlaylist(id:string,playlist : {name : string, description: string, public : boolean}) : Observable<Playlist>{
    return this.http.post<Playlist>(this.server_url + "/playlists/" + id + "/create" , playlist);
  }

  updatePlaylist(id:string,playlist : {name : string, description: string, public : boolean}):Observable<Playlist>{
    return this.http.put<Playlist>(this.server_url + "/playlists/" + id + "/update" , playlist);
  }

 addCoverImage(id :string, base64:string){
  const headers = new HttpHeaders({
    'Content-Type': 'image/jpeg', // Use o tipo de imagem correto (image/png, image/jpeg, etc.)
  });

  const body = base64.split(',')[1]; // Remove o prefixo data:image/png;base64,

  return this.http.put(this.server_url + "/playlists/" + id + "/images",  body,
    { headers: headers, responseType: 'text' })

 }

  deletePlaylistItem(id:string, track : { tracks ?: UriTrack[] , snapshot_id ? : string} ) : Observable<void> {
    const options = {
      body: track,  // Passando o corpo da requisição
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete<void>(this.server_url + "/playlists/" + id + "/tracks", options)
  }


  addPlaylistItems(id:string, tracks : {uris : string[],position: number}){
    return this.http.post(this.server_url + "/playlists/" + id + "/tracks", tracks)
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

  getTopTracks(): Observable<ResponseTracks>{
    return this.http.get<ResponseTracks>("http://localhost:8081/api/spotify/tracks/top")
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
