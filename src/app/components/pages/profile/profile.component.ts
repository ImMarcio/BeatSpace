import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


constructor(private router: Router){}

  goToHome() {
    this.router.navigate(['/home']);
  }
  
  artists = [
  
    { image: 'https://avatars.githubusercontent.com/u/87027617?v=4', alt: 'Imagem 2', title: 'Haniel Costa ',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    { image: 'https://avatars.githubusercontent.com/u/105254896?v=4', alt: 'Imagem 3', title: 'Márcio José',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana The Front',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
    { image: 'https://avatars.githubusercontent.com/u/105940717?v=4', alt: 'Imagem 3', title: 'Ricardo Luiz',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: 'https://avatars.githubusercontent.com/u/102380570?v=4', alt: 'Imagem 4', title: 'João Marcos',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  
  
  ];

    
  musics = [
  
    { image: 'https://avatars.githubusercontent.com/u/87027617?v=4', alt: 'Imagem 2', title: 'Haniel Costa ',music:'Baby Metal' },
    { image: 'https://avatars.githubusercontent.com/u/105254896?v=4', alt: 'Imagem 3', title: 'Márcio José',music:'SunFlower' },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana The Front',music:'Retro 2019' },
  
  ];

}
