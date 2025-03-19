import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../shared/services/spotify.service';
import { HistoryService } from '../../../../shared/services/history.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DateISOPipe } from "../../../../shared/pipes/date-iso.pipe";
import {MatIconModule} from '@angular/material/icon'
import { User } from '../../../../shared/models/User';

@Component({
  selector: 'app-albunssalvos',
  imports: [CommonModule, RouterModule, DateISOPipe, MatIconModule],
  templateUrl: './albunssalvos.component.html',
  styleUrl: './albunssalvos.component.scss'
})
export class AlbunssalvosComponent implements OnInit {

albuns : any[] = []
albumSelected: any;
userId : any;
user : User;
constructor( private spotifyService  :SpotifyService, private cd  :ChangeDetectorRef, private historyService:HistoryService){
 this.userId = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).id
 this.user = (JSON.parse(localStorage.getItem("current_user") ?? "") as User)
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

  getSelectedAlbum(album:any){
    this.albumSelected = album;
    console.log(this.albumSelected.name)
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
        this.logAction(`${this.user.display_name} `,`removeu o album ${this.albumSelected.name} dos salvos `)
        // Trate a resposta da API, exiba uma mensagem de sucesso, etc.
      },
      error => {
        console.error('Erro ao remover álbuns', error);
        // Trate erros, exiba mensagens de erro, etc.
      }
    );
  }

  

  logAction(action:string, details:string) {
    const username = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).display_name

    this.historyService.saveAction(this.userId, username, action, details).subscribe(response => {
      console.log('Ação registrada:', response);
    });
  }



}
