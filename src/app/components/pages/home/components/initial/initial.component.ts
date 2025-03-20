import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarrouselComponent } from '../../../../carrousel/carrousel.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { Album } from '../../../../../shared/models/Album';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { Track } from '../../../../../shared/models/Track';
import { User } from '../../../../../shared/models/User';
import { Router } from '@angular/router';
import { ResenhaResponse, ResenhaService } from '../../../../../shared/services/resenha.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DateISOPipe } from "../../../../../shared/pipes/date-iso.pipe";
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-initial',
  imports: [CommonModule, RouterModule, CarouselModule, CarouselModule, RatingModule, ReactiveFormsModule, FormsModule, MatIconModule, DateISOPipe],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss'
})
export class InitialComponent implements OnInit {

  user ? : User

  albuns : Album[] = []

  resenhas : ResenhaResponse[] = []

  constructor(private router: Router, private spotifyService : SpotifyService, private cd : ChangeDetectorRef, private resenhaService : ResenhaService,private apollo : Apollo){}



  ngOnInit(): void {
    this.spotifyService.getCurrentUser().subscribe({
      next : (user)=>{
        this.user = user;
        localStorage.setItem("current_user",JSON.stringify(this.user))
      },
      complete : ()=>{
        this.cd.detectChanges();
      }
    })


    this.spotifyService.getAlbumReleases().subscribe({
      next:(response)=>{
          this.albuns = response.albums.items;
      },
      error : (error)=>{
        console.error(error)
      },
      complete : ()=>{
        this.cd.detectChanges();
      }
    }
  )

  this.apollo
  .watchQuery({
    query: gql`
      {
        getResenhasMaisCurtidas{
          id,
          texto,
          autor,
          userimg,
          nota,
          likes{
            id
          },
          data
        }
      }
    `,
  })
  .valueChanges.subscribe((result: any) => {
   this.resenhas = result.data?.getResenhasMaisCurtidas;
  
  });

  
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

}
