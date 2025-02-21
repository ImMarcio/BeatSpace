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

@Component({
    selector: 'app-profile',
    imports: [CommonModule,NavbarLogadoComponent, MatIconModule,RouterModule],
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
