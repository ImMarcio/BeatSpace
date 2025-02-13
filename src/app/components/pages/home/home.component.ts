import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from "../../carrousel/carrousel.component";
import { FooterComponent } from "../../footer/footer.component";
import { NavbarLogadoComponent } from '../../navbar-logado/navbar-logado.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { concatMap } from 'rxjs';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FooterComponent, NavbarLogadoComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

    user? : User

  constructor(private route: ActivatedRoute,private spotifyService : SpotifyService) {
    const queryParams = this.route.snapshot.queryParams;
    if(localStorage.getItem("code") === null){
      localStorage.setItem("code",queryParams["code"])
    }
  }


ngOnInit(): void {

}

}
