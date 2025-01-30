import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from "../../carrousel/carrousel.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule, CarrouselComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  items = [
  
    { image: 'https://avatars.githubusercontent.com/u/87027617?v=4', alt: 'Imagem 2', title: 'Haniel Costa ',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    { image: 'https://avatars.githubusercontent.com/u/105254896?v=4', alt: 'Imagem 3', title: 'Márcio José',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana The Front',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  
  ];

  coments = [
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 2', title: 'Juliana The Front',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 3', title: 'Juliana The Front',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana The Front',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  
  ]

  console(){
    console.log("string")
  }

}
