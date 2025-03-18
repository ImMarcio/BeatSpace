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

@Component({
  selector: 'app-initial',
  imports: [CommonModule,RouterModule,CarouselModule,CarouselModule, RatingModule,ReactiveFormsModule,FormsModule,MatIconModule],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss'
})
export class InitialComponent implements OnInit {

  user ? : User

  albuns : Album[] = []

  resenhas : ResenhaResponse[] = []

  constructor(private router: Router, private spotifyService : SpotifyService, private cd : ChangeDetectorRef, private resenhaService : ResenhaService){}

  items = [
    { id:"1", image: '../../../../assets/BK-Icarus.jpeg', alt: 'Imagem 2', title: 'Icarus',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    {id:"2", image: '../../../../assets/tyler-creator-chromakopia-album.jpg', alt: 'Imagem 3', title: 'Chromakopia',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    {id:"3", image: '../../../../assets/ab67616d0000b273bbd45c8d36e0e045ef640411.jpeg', alt: 'Debí Tirar Más Fotos', title: 'Debí Tirar Más Fotos',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  ];

  coments = [
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 2', title: 'Juliana The Front',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 3', title: 'Juliana The Front',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana The Front',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  
  ]


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

  this.resenhaService.GetMostLiked().subscribe({
    next : (resenhas)=>{
      this.resenhas = resenhas;
    },
    complete : ()=>{
      this.cd.detectChanges();
    }
  })

  
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

}
