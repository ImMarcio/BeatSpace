import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MainComponent } from '../../main/main.component';
import { FooterComponent } from '../../footer/footer.component';
import { CarrouselComponent } from '../../carrousel/carrousel.component';
import { ContatosComponent } from '../../contatos/contatos.component';


@Component({
  selector: 'app-landing-page',
  imports: [NavbarComponent,MainComponent,FooterComponent, CarrouselComponent, ContatosComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
