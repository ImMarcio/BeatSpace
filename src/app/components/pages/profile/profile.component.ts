import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { Artist } from '../../../shared/models/Artist';
import { Track } from '../../../shared/models/Track';
import { NavbarLogadoComponent } from '../../navbar-logado/navbar-logado.component';
import { User } from '../../../shared/models/User';
import { FavoritoService } from '../../../shared/services/favorito.service';
import { Album } from '../../../shared/models/Album';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,NavbarLogadoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{


tracks : Track[] = []
artists : Artist[] = []
user ? : User
usuarioId: string = "marciojsilva159@gmail.com";  // Substitua pelo ID real do usuário
favoritosIds: string[] = [];
albums: Album[] = [];

  

constructor(private router: Router, private cd : ChangeDetectorRef, private spotifyService : SpotifyService, private favoritoService: FavoritoService){
 this.user =  JSON.parse(localStorage.getItem("current_user") ?? "") as User;
}

  goToHome() {
    this.router.navigate(['/home']);
  }
  goToAlbumFavoritos() {
    this.router.navigate(['/albums-favoritos']);
  }
  

  ngOnInit(): void {
    this.spotifyService.getTopTracks().subscribe({
      next:(tracks)=>{
        this.tracks = tracks.items;
      },
      complete : ()=>{
        this.cd.detectChanges();
      }
    })

    this.spotifyService.getTopArtists().subscribe({
      next :(artists)=>{
        this.artists = artists.items;
      }
    })

   
      

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


  // Método para verificar se o álbum está favoritado
  isFavorito(albumId: string = ""): boolean {
    return this.favoritosIds.includes(albumId);
  }

  favoritarAlbum(albumId: string): void {
    this.getEmailCurrentUser()
    if (this.isFavorito(albumId)) {
      this.desfavoritarAlbum(albumId);
    } else {
      this.favoritoService.favoritarAlbum(this.usuarioId, albumId).subscribe({
        next: () => {
          console.log("Atualizando...")
          this.atualizarFavoritos(); // Atualiza a lista de favoritos após favoritar
        },
        error: (error) => {
          console.error('Erro ao favoritar álbum:', error);
        }
      });
    }
  }
  
  desfavoritarAlbum(albumId: string): void {
    this.getEmailCurrentUser()
    this.favoritoService.desfavoritarAlbum(this.usuarioId, albumId).subscribe({
      next: () => {
        console.log("Atualizando...")
        this.atualizarFavoritos(); // Atualiza a lista de favoritos após desfavoritar
      },
      error: (error) => {
        console.error('Erro ao desfavoritar álbum:', error);
      }
    });
  }
  
  atualizarFavoritos(): void {
    this.getEmailCurrentUser()
    this.favoritoService.listarFavoritos(this.usuarioId).subscribe({
      next: (favoritos) => {
        this.favoritosIds = favoritos;
        console.log("Atualizando...")
      },
      error: (error) => {
        console.error('Erro ao listar favoritos:', error);
      }
    });
  }


getEmailCurrentUser(){
  if(this.user){
    this.usuarioId = this.user.email
    console.log(this.usuarioId)
    return this.user.email;
  } else {
    console.log("User inválido");
    return null;
  }
}

}
