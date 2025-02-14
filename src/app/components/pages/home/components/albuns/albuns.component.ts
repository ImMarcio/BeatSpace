import { ChangeDetectorRef, Component } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { Track } from '../../../../../shared/models/Track';
import { CommonModule } from '@angular/common';
import { Album } from '../../../../../shared/models/Album';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ResponseSearchAlbum } from '../../../../../shared/models/ResponseSearchAlbum';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-albuns',
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,RouterModule],
  templateUrl: './albuns.component.html',
  styleUrl: './albuns.component.scss'
})
export class AlbunsComponent {

albuns : Album[] = []
loading: boolean = false;
FormGroup? : FormGroup

constructor(private spotifyService : SpotifyService, private fb : FormBuilder,private cd : ChangeDetectorRef){
  this.FormGroup = this.fb.group(
    {"query" : ["",Validators.required]}
  )
}

get query(){
  return this.FormGroup?.get("query")?.value;
}

search() {
  this.loading = true;
  this.spotifyService.search(this.FormGroup?.get("query")?.value,"album").subscribe({
    next : (albuns)=>{
      console.log(albuns)
      this.albuns = (albuns as ResponseSearchAlbum).albums.items;
    },
    error : ()=>{
      this.loading = false;
    },
    complete : ()=>{
      this.loading = false;
      this.cd.detectChanges();
    }
  })
}


}
