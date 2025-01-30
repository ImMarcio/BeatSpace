import { Component } from '@angular/core';

import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { ContatosComponent } from '../contatos/contatos.component';

@Component({
  selector: 'app-main',
  imports: [CarouselModule,TagModule,ButtonModule,FormsModule,ContatosComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
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
    { image: 'https://avatars.githubusercontent.com/u/101681192?v=4', alt: 'Imagem 1', title: 'Allan Amancio', feedback:"Eu gostei muito da plataforma para interagir." },
    { image: 'https://avatars.githubusercontent.com/u/87027617?v=4', alt: 'Imagem 2', title: 'Haniel  ',feedback:"Eu gostei muito da plataforma para interagir." },
    { image: 'https://avatars.githubusercontent.com/u/105254896?v=4', alt: 'Imagem 3', title: 'Márcio',feedback:"Eu gostei muito da plataforma para interagir." },
    { image: 'https://avatars.githubusercontent.com/u/101995776?v=4', alt: 'Imagem 4', title: 'Juliana',feedback:"Eu gostei muito da plataforma para interagir." }
  ];
}
