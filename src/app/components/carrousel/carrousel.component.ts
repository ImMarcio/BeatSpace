import { Component,Input  } from '@angular/core';
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
  @Input() title: string = ''; 
  @Input() items: any[] = [];

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


}
