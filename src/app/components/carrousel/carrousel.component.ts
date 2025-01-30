import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-carrousel',
  imports: [ CarouselModule,TagModule,ButtonModule, FormsModule ],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss'
})
export class CarrouselComponent {
  responsiveOptions: any[];


  constructor() {
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  items = [
    { image: 'https://avatars.githubusercontent.com/u/101681192?v=4', alt: 'Imagem 1', title: 'Allan Amancio', feedback:"Adoro como a comunidade é acolhedora e sempre disposta a ajudar. As discussões são super produtivas e todos compartilham dicas valiosas para melhorar nossas habilidades musicais!" },
    { image: 'https://avatars.githubusercontent.com/u/87027617?v=4', alt: 'Imagem 2', title: 'Haniel Costa ',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    { image: 'https://avatars.githubusercontent.com/u/105254896?v=4', alt: 'Imagem 3', title: 'Márcio José',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana The Front',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
    { image: 'https://avatars.githubusercontent.com/u/102380570?v=4', alt: 'Imagem 4', title: 'João Marcos',feedback:"Seria interessante ter mais sessões ao vivo, como webinars ou discussões com profissionais da música. Isso ajudaria a trazer um aprendizado mais direto e prático para todos os membros." },
    { image: 'https://avatars.githubusercontent.com/u/105940717?v=4', alt: 'Imagem 4', title: 'Ricardo Luiz',feedback:"A diversidade de membros e gêneros musicais é incrível. Sempre aprendo algo novo, seja sobre teoria musical, produção ou novos estilos. É uma comunidade que realmente enriquece minha jornada musical!" }

  ];
}
