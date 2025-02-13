import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../shared/services/spotify.service';

@Component({
  selector: 'app-navbar-logado',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar-logado.component.html',
  styleUrl: './navbar-logado.component.scss'
})
export class NavbarLogadoComponent implements OnInit {

  user ? : User

  constructor(private router: Router,private spotifyService : SpotifyService, private cd : ChangeDetectorRef) {
  } 

ngOnInit(): void {
  this.spotifyService.getCurrentUser().subscribe({
    next : (user)=>{
      this.user = user;
      localStorage.setItem("current_user",JSON.stringify(this.user))
    },
    complete : ()=>{
      this.cd.detectChanges();
    }
  })
}
  
  goToProfile() {
    this.router.navigate(['/profile'])
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("code");
    window.location.href = "/"
  }

}
