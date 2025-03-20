import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarLogadoComponent } from '../../../navbar-logado/navbar-logado.component';
import { Track, Artist } from '../../../../shared/models/Track';
import { User } from '../../../../shared/models/User';
import { SpotifyService } from '../../../../shared/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmusicas',
   imports: [CommonModule,MatIconModule],
  templateUrl: './topmusicas.component.html',
  styleUrl: './topmusicas.component.scss'
})
export class TopmusicasComponent implements OnInit{

@Input() userId : string = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).id
tracks : Track[] = []
user ? : User

constructor(private router: Router, private cd : ChangeDetectorRef, private spotifyService : SpotifyService){
    this.user =  JSON.parse(localStorage.getItem("current_user") ?? "") as User;
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
}

}
