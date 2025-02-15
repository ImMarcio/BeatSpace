import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  baseUrl = "http://localhost:8081/api/comentarios"


  constructor(private http : HttpClient) { }

  favoritarAlbum(usuarioId: string, albumId: string): Observable<any> {
    const url = `${this.baseUrl}/${usuarioId}/${albumId}`;
    return this.http.post(url, {});  // Enviando um POST para favoritar o álbum
  }

  // Desfavoritar álbum
  desfavoritarAlbum(usuarioId: string, albumId: string): Observable<any> {
    const url = `${this.baseUrl}/${usuarioId}/${albumId}`;
    return this.http.delete(url);  // Enviando um DELETE para desfavoritar o álbum
  }
    // Listar álbuns favoritos
    listarFavoritos(usuarioId: string): Observable<string[]> {
      const url = `${this.baseUrl}/${usuarioId}`;
      return this.http.get<string[]>(url);  // Enviando um GET para listar os favoritos do usuário
    }

}
