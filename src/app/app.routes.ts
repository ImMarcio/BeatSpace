import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { homeGuard } from './shared/guards/home.guard';
import { InitialComponent } from './components/pages/home/components/initial/initial.component';
import { MusicaComponent } from './components/pages/home/components/musica/musica.component';
import { MusicasComponent } from './components/pages/home/components/musicas/musicas.component';
import { AlbunsComponent } from './components/pages/home/components/albuns/albuns.component';
import { AlbumComponent } from './components/pages/home/components/album/album.component';
import { PlaylistsComponent } from './components/pages/home/components/playlists/playlists.component';

export const routes: Routes = [

    { path: '', component: LandingPageComponent },
    { path: 'home', component: HomeComponent, canActivate : [homeGuard],
        children: [ // Definindo rotas aninhadas
            { path: '', component: InitialComponent },
            { path: 'musica/:id', component: MusicaComponent },
            {path : "musicas", component : MusicasComponent},
            {path : "albuns", component : AlbunsComponent},
            {path: "album/:id",component : AlbumComponent},
            {path : "playlists", component : PlaylistsComponent},
            {path : "playlist/:id", component : PlaylistsComponent},
          ]
    },
    { path: 'profile', component: ProfileComponent }

];
