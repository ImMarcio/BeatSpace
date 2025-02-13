import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { SpotifyService } from './shared/services/spotify.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
      providePrimeNG({
    theme: {
        preset: Aura
    }
})
,provideRouter(routes), provideClientHydration(withEventReplay()),provideHttpClient(withFetch(),withInterceptors([tokenInterceptor])),
importProvidersFrom(ReactiveFormsModule),provideAnimationsAsync()
]
};

