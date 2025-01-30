import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MainComponent,FooterComponent, CarrouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BeatSpace';
}
