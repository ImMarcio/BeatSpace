import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarLogadoComponent } from '../../../navbar-logado/navbar-logado.component';
import { Track} from '../../../../shared/models/Track';
import { User } from '../../../../shared/models/User';
import { SpotifyService } from '../../../../shared/services/spotify.service';
import { Artist } from '../../../../shared/models/Artist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topartistas',
  imports: [CommonModule,MatIconModule],
  templateUrl: './topartistas.component.html',
  styleUrl: './topartistas.component.scss'
})
export class TopartistasComponent implements OnInit {
@Input() userId : string = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).id
artists : Artist[] = []
user ? : User

constructor(private router: Router, private cd : ChangeDetectorRef, private spotifyService : SpotifyService){
    this.user =  JSON.parse(localStorage.getItem("current_user") ?? "") as User;
}

ngOnInit(): void {
  this.spotifyService.getTopArtists().subscribe({
      next :(artists)=>{
          this.artists = artists.items;
      }
  })
}

}
