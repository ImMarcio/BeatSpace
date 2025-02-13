import { HttpInterceptorFn } from '@angular/common/http';
import { SpotifyService } from '../services/spotify.service';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  const spotifyService = inject(SpotifyService);
  
  // Flag para controlar o estado de busca de token
  let isTokenBeingFetched = false;
  


  // Se a requisição não for para "/spotify", passa direto
  if (!req.url.includes("/spotify") || req.url.includes("/api/spotify/token")) {
    return next(req);
  }

  // Se houver um token, adiciona no header
  if (token) {
    const parsedToken = JSON.parse(token);
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${parsedToken.access_token}`
      }
    });
    return next(tokenReq)
  }

  // Se não houver token e não estiver buscando um, tenta buscar com base no código salvo
  const code = localStorage.getItem("code");
  if (code && !isTokenBeingFetched) {
    isTokenBeingFetched = true;  // Bloqueia para novas requisições até a primeira completar
    return spotifyService.getToken(code).pipe(
      switchMap(newToken => {
        localStorage.setItem("token", JSON.stringify(newToken));
        const tokenReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken.access_token}`
          }
        });
        isTokenBeingFetched = false;  // Libera o bloqueio após o token ser obtido
        return next(tokenReq);
      })
    );
  }
  return next(req); // Caso não tenha código ou token, continua sem fazer nada
};

