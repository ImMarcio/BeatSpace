import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/models/User';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { FavoritasComponent } from '../home/components/playlists/favoritas/favoritas.component';
import { AlbunssalvosComponent } from '../profile/albunssalvos/albunssalvos.component';
import { HistoricoComponent } from '../profile/historico/historico.component';
import { ResenhasComponent } from '../profile/resenhas/resenhas.component';
import { TopartistasComponent } from '../profile/topartistas/topartistas.component';
import { TopmusicasComponent } from '../profile/topmusicas/topmusicas.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user',
  imports: [MatIconModule,CommonModule,TabsModule,FavoritasComponent,ResenhasComponent,ToastModule],
  providers : [MessageService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

userId  : string;
user ?: User;
followed : boolean = false;

constructor(private spotifyService : SpotifyService, private route : ActivatedRoute , private cd : ChangeDetectorRef,private messageService : MessageService){
  this.userId = this.route.snapshot.paramMap.get("id") ?? ""
}

ngOnInit(): void {

    this.spotifyService.isFollowing(this.userId).subscribe({
      next : (boolean)=>{
        console.log(boolean)
        this.followed = boolean[0];
      },
      complete : ()=>{
        this.cd.detectChanges();
      }
    })

    this.spotifyService.getUser(this.userId).subscribe({
      next : (user)=>{
        this.user = user;
      },
      complete : ()=>{
        this.cd.detectChanges();
      }

    })
}

followUser(){
  this.spotifyService.followUser({ids : [this.userId]}).subscribe({
    next : ()=>{
      this.messageService.add({ severity: 'success', summary: 'successo', detail: `Você agora está seguindo ${this.user?.display_name}!` });
    },
    complete : ()=>{
      this.followed = true;
      this.cd.detectChanges();
    }
  })
}

unfollowUser(){
  this.spotifyService.unfollowUser({ids : [this.userId]}).subscribe({
    next : ()=>{
      this.messageService.add({ severity: 'success', summary: 'successo', detail: `Você deixou de seguir ${this.user?.display_name}!` });
    },
    complete : ()=>{
      this.followed = false;
      this.cd.detectChanges();
    }
  })
}

}
