import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from "../../carrousel/carrousel.component";
import { FooterComponent } from "../../footer/footer.component";
import { NavbarLogadoComponent } from '../../navbar-logado/navbar-logado.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { json } from 'stream/consumers';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FooterComponent, NavbarLogadoComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  constructor(private route: ActivatedRoute,private spotifyService : SpotifyService) {
     
    const queryParams = this.route.snapshot.queryParams;

    // Acessar um parâmetro específico
    const code = queryParams['code'];
    const state = queryParams['state'];
   
    

  }


  items = [
  
    { image: '../../../../assets/BK-Icarus.jpeg', alt: 'Imagem 2', title: 'Icarus',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    { image: '../../../../assets/tyler-creator-chromakopia-album.jpg', alt: 'Imagem 3', title: 'Chromakopia',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: '../../../../assets/ab67616d0000b273bbd45c8d36e0e045ef640411.jpeg', alt: 'Debí Tirar Más Fotos', title: 'Debí Tirar Más Fotos',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  
  ];

  coments = [
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 2', title: 'Juliana The Front',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 3', title: 'Juliana The Front',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana The Front',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  
  ]

    ngOnInit(): void {
       
    }

    showMusicas(){
      this.spotifyService.getAlbumReleases().subscribe({
        next:(response)=>{
            console.log(response)
        }
      })
    }
   



}
