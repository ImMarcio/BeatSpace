import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { ComentarioService } from '../../../../../shared/services/comentario.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Album } from '../../../../../shared/models/Album';
import { ResenhaService } from '../../../../../shared/services/resenha.service';

@Component({
  selector: 'app-ranking',
  imports: [RouterModule,CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {

  albuns : Album[] = []

  constructor(private spotifyService : SpotifyService, private resenhaService : ResenhaService, private cd : ChangeDetectorRef){

  }

  ngOnInit(): void {
      this.resenhaService.GetRankings().subscribe({
        next : (dto)=>{
          const ids = dto.map(x=>x.parentId)
          this.spotifyService.getSeveralAlbuns(ids).subscribe({
            next : (albuns)=>{
              console.log(albuns)
              this.albuns = albuns.albums.map(album =>{
                return {
                  ...album,
                  averagenota : dto.find(object=>object.parentId === album.id)?.nota
                }
              });
            },
          
          })

        },
        complete : ()=>{
          this.cd.detectChanges();
        }
      })
  }

}
