import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { homeGuard } from './shared/guards/home.guard';
import { InitialComponent } from './components/pages/home/components/initial/initial.component';
import { MusicaComponent } from './components/pages/home/components/musica/musica.component';

export const routes: Routes = [

    { path: '', component: LandingPageComponent },
    { path: 'home', component: HomeComponent, canActivate : [homeGuard],
        children: [ // Definindo rotas aninhadas
            { path: '', component: InitialComponent },
            { path: 'musicas/:id', component: MusicaComponent }
          ]
    },
    { path: 'profile', component: ProfileComponent }

];
