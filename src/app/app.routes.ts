import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

export const routes: Routes = [

    { path: '', component: LandingPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent }

];
