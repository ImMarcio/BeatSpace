import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { LocalstorageService } from '../../../../../shared/services/localstorage.service';
import { User } from '../../../../../shared/models/User';
import { Playlist } from '../../../../../shared/models/Playlist';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-playlists',
  imports: [RouterModule,CommonModule,MatIconModule,ButtonModule,RouterModule],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit {

  playlists : Playlist[] = []

  constructor(private spotifyService :SpotifyService,private cd : ChangeDetectorRef){
  }

  

  ngOnInit(): void {
        this.spotifyService.getCurrentUserPlaylists().subscribe({
            next : (response)=>{
            this.playlists = response.items;
            },
            error: (error)=>{
              console.log(error)
            },
            complete : ()=>{
              this.cd.detectChanges;
            }
        })
  }


}
