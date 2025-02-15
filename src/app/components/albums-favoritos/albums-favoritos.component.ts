import { Component } from '@angular/core';
import { FavoritoService } from '../../shared/services/favorito.service';
import { SpotifyService } from '../../shared/services/spotify.service';
import { Album } from '../../shared/models/Album';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-albums-favoritos',
  imports: [CommonModule],
  templateUrl: './albums-favoritos.component.html',
  styleUrl: './albums-favoritos.component.scss'
})
export class AlbumsFavoritosComponent {
  usuarioId: string = this.user!.email;  // Substitua pelo ID real do usuário
  favoritosIds: string[] = [];
  albums: Album[] = [];
  user ? : User
  
  constructor(  private favoritoService: FavoritoService,
    private spotifyService: SpotifyService){
      this.user =  JSON.parse(localStorage.getItem("current_user") ?? "") as User;
      this.usuarioId = this.user.email
    }



    ngOnInit(): void {
      

      // Passo 1: Listar os álbuns favoritos
      this.favoritoService.listarFavoritos(this.usuarioId).subscribe((ids) => {
        this.favoritosIds = ids;
  
        // Passo 2: Buscar informações de cada álbum usando getAlbum
        this.favoritosIds.forEach((albumId) => {
          this.spotifyService.getAlbum(albumId).subscribe((albumDetails) => {
            this.albums.push(albumDetails);
          });
        });
      });
    }

  console(){
    console.log(this.favoritosIds)
  }

}
