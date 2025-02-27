import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../shared/services/spotify.service';
import { Album } from '../../../../shared/models/Album';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DateISOPipe } from "../../../../shared/pipes/date-iso.pipe";
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-albunssalvos',
  imports: [CommonModule, RouterModule, DateISOPipe, MatIconModule],
  templateUrl: './albunssalvos.component.html',
  styleUrl: './albunssalvos.component.scss'
})
export class AlbunssalvosComponent implements OnInit {

albuns : any[] = []

constructor( private spotifyService  :SpotifyService, private cd  :ChangeDetectorRef){

}

ngOnInit(): void {
    this.spotifyService.getSavedAlbuns().subscribe({
      next : (albuns)=>{
        console.log(albuns)
        this.albuns = albuns.items;
      },
      complete : ()=>{
        this.cd.detectChanges();
      }
    })
}

  // Exemplo de chamada da função
  onRemoveAlbums(ids: string[]) {
    const request = { ids };
    this.spotifyService.removeSavedAlbuns(request).subscribe(
      response => {
        this.spotifyService.getSavedAlbuns().subscribe({
          next : (albuns)=>{
            console.log(albuns)
            this.albuns = albuns.items;
          },
          complete : ()=>{
            this.cd.detectChanges();
          }
        })
        console.log('Álbuns removidos com sucesso', response);
        // Trate a resposta da API, exiba uma mensagem de sucesso, etc.
      },
      error => {
        console.error('Erro ao remover álbuns', error);
        // Trate erros, exiba mensagens de erro, etc.
      }
    );
  }


}
