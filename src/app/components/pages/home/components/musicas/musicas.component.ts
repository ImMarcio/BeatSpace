import { ChangeDetectorRef, Component } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { Track } from '../../../../../shared/models/Track';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResponseSearchTrack } from '../../../../../shared/models/ResponseSearchTrack';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-musicas',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule,ButtonModule],
  templateUrl: './musicas.component.html',
  styleUrl: './musicas.component.scss'
})
export class MusicasComponent {

  
  tracks : Track[] = []
  loading: boolean = false;
  FormGroup? : FormGroup

constructor(private spotifyService : SpotifyService, private cd : ChangeDetectorRef, private fb : FormBuilder){
   this.FormGroup = this.fb.group(
      {"query" : ["",Validators.required]}
    )
}


search() {
  this.loading = true;
  this.spotifyService.search(this.FormGroup?.get("query")?.value,"track").subscribe({
    next : (tracks)=>{
      this.tracks = (tracks as ResponseSearchTrack).tracks.items;
    },
    error : ()=>{
      this.loading = false;
    },
    complete : ()=>{
      this.loading = false;
      this.FormGroup?.reset();
      this.cd.detectChanges();
    }
  })
}

}
