import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../../../../shared/services/like.service';
import { ComentarioService } from '../../../../shared/services/comentario.service';
import { ResenhaResponse, ResenhaService } from '../../../../shared/services/resenha.service';
import { User } from '../../../../shared/models/User';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-resenhas',
  templateUrl: './resenhas.component.html',
  styleUrls: ['./resenhas.component.css'],
  imports: [CommonModule,RatingModule,FormsModule,MatIconModule]
})
export class ResenhasComponent implements OnInit {

  @Input() userId : string = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).id
  resenhas : ResenhaResponse[] = []
  user : User;
  constructor( private likeService : LikeService ,private comentarioService : ComentarioService,private resenhaService : ResenhaService,private cd : ChangeDetectorRef ) {
    this.user = (JSON.parse(localStorage.getItem("current_user") ?? "") as User)
   }

  ngOnInit() {
    
    this.resenhaService.GetByUser(this.userId).subscribe({
      next : (resenhas)=>{
        this.resenhas = resenhas;
      }
    })
  

  }

}
