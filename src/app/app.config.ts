import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APOLLO_OPTIONS, provideApollo} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
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
importProvidersFrom(ReactiveFormsModule),provideAnimationsAsync(), provideAnimationsAsync(), provideApollo(() => {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({ uri:'http://localhost:8081/graphql' }),
    cache: new InMemoryCache(),
    // other options...
  };
})
]
};

