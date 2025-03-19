import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { Artist } from '../../../shared/models/Artist';
import { Track } from '../../../shared/models/Track';
import { NavbarLogadoComponent } from '../../navbar-logado/navbar-logado.component';
import { User } from '../../../shared/models/User';
import { MatIconModule } from '@angular/material/icon';
import { TabsModule } from 'primeng/tabs';
import { TopartistasComponent } from "./topartistas/topartistas.component";
import { TopmusicasComponent } from "./topmusicas/topmusicas.component";
import { AlbunssalvosComponent } from "./albunssalvos/albunssalvos.component";
import { FavoritasComponent } from "../home/components/playlists/favoritas/favoritas.component";
import { HistoricoComponent } from "./historico/historico.component";
import { ResenhasComponent } from "./resenhas/resenhas.component";
// import { TopArtistasComponent } from "../../top-artistas/top-artistas.component";
// import { TopMusicasComponent } from "../../top-musicas/top-musicas.component";

@Component({
    selector: 'app-profile',
    imports: [CommonModule, NavbarLogadoComponent, MatIconModule, RouterModule, TabsModule, TopartistasComponent, TopmusicasComponent, AlbunssalvosComponent, FavoritasComponent, HistoricoComponent, ResenhasComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent{


tracks : Track[] = []
artists : Artist[] = []
user ? : User

constructor(private router: Router, private cd : ChangeDetectorRef, private spotifyService : SpotifyService){
    this.user =  JSON.parse(localStorage.getItem("current_user") ?? "") as User;
}

    isOpen = false;

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    goToHome() {
        this.router.navigate(['/home']);
    }

    

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("current_user");
        localStorage.removeItem("code");
        window.location.href = "/"
    }

}
