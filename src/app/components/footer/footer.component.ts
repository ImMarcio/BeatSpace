import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ButtonModule,FloatLabelModule,FormsModule,CarouselModule,TagModule,RouterModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
value: any;

responsiveOptions: any[];



constructor(private router: Router) {
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
goToHome() {
  this.router.navigate(['/home']);
}

scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

getSeverity(status: string) {
  switch (status) {
      case 'INSTOCK':
          return 'success';
      case 'LOWSTOCK':
          return 'warn';
      case 'OUTOFSTOCK':
          return 'danger';
      default:
          return 'unknown';
  }
}

}
