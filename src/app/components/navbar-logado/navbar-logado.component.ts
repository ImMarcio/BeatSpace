import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-logado',
  imports: [],
  templateUrl: './navbar-logado.component.html',
  styleUrl: './navbar-logado.component.scss'
})
export class NavbarLogadoComponent {

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile'])
  }

}
