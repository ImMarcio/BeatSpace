import { Component } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { generaterandomstring} from '../../shared/utils/generaterandomstring'

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {


  constructor(private loginService : LoginService){
  }

  onLogin() {
    const clientId = 'b104f3a1e82d4fcfbaf5f4f8fcb5f8d5';
    const redirectUri = 'http://localhost:4200/home';
    const scope = 'user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public user-follow-read user-follow-modify ugc-image-upload user-library-read user-library-modify playlist-read-private';
    const state =  generaterandomstring(16); // Optional, but recommended for security
    
   
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
    });
  
    // Construct the full URL
    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  
    // Redirect the user to the Spotify authorization page
    window.location.href = authUrl;
  }

}


