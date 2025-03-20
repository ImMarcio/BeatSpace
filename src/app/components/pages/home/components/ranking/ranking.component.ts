import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { ComentarioService } from '../../../../../shared/services/comentario.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Album } from '../../../../../shared/models/Album';
import { ResenhaService } from '../../../../../shared/services/resenha.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


interface Selections {
  name: string;
  code: string;
}

@Component({
  selector: 'app-ranking',
  imports: [RouterModule,CommonModule,AutoCompleteModule,FormsModule,SelectModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {

  albuns : Album[] = []
  genres : Selections[] = []
  filteredGenres : string[] = []
  genreselected : Selections= {code : 'Todos' , name : "Todos"}

  constructor(private spotifyService : SpotifyService, private resenhaService : ResenhaService, private cd : ChangeDetectorRef){

  }

  ngOnInit(): void {
      this.resenhaService.GetRankings(this.genreselected.code).subscribe({
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

      this.resenhaService.getGenres().subscribe({
        next : (genres)=>{
            this.genres = genres.map(x=>{
              return {
                code : x,
                name : x
              }
            });
            this.genres.push({code : "Todos", name : "Todos"})
        },
        complete : ()=>{
          this.cd.detectChanges;
        }
      })
  }

  changeGenre(){
    this.resenhaService.GetRankings(this.genreselected.code).subscribe({
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

  filterGenre(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.genres as any[]).length; i++) {
        let genre = (this.genres as any[])[i];
        if (genre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(genre);
        }
    }

    this.filteredGenres = filtered;
}

}
