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
import { PlaylistComponent } from './components/pages/home/components/playlist/playlist.component';
import { firstValueFrom } from 'rxjs';
import { FavoritasComponent } from './components/pages/home/components/playlists/favoritas/favoritas.component';
import { AddplaylistComponent } from './components/pages/home/components/playlists/addplaylist/addplaylist.component';
import { TopartistasComponent } from './components/pages/profile/topartistas/topartistas.component';
import { TopmusicasComponent } from './components/pages/profile/topmusicas/topmusicas.component';
import { AlbunssalvosComponent } from './components/pages/profile/albunssalvos/albunssalvos.component';
import { RankingComponent } from './components/pages/home/components/ranking/ranking.component';

export const routes: Routes = [

    { path: '', component: LandingPageComponent },
    { path: 'home', component: HomeComponent, canActivate : [homeGuard],
        children: [ // Definindo rotas aninhadas
            { path: '', component: InitialComponent },
            { path: 'musica/:id', component: MusicaComponent },
            {path : "musicas", component : MusicasComponent},
            {path : "albuns", component : AlbunsComponent},
            {path: "album/:id",component : AlbumComponent},
            {path : "playlists", component : PlaylistsComponent,children : [
                {path : "", component : FavoritasComponent},
                {path : "add",component : AddplaylistComponent}
            ]},
            {path : "playlist/:id", component : PlaylistComponent},
            {path : "rankings",component : RankingComponent}
          ]
    },
    { path: 'profile', component: ProfileComponent,children : [
        {path : "", component : TopartistasComponent},
        {path : "top-musicas", component : TopmusicasComponent},
        {path : "albuns-salvos", component : AlbunssalvosComponent }
    ] }

];
