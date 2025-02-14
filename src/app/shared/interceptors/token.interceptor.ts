import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { SpotifyService } from '../services/spotify.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  const spotifyService = inject(SpotifyService);
  const router = inject(Router)
  
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
    return next(tokenReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (
            !(!req.url.includes("/spotify") || req.url.includes("/api/spotify/token") || req.url.includes('api/spotify/refresh-token')) && // <- this will avoid an infinite loop when the accessToken expires.
            err.status === 401) {
              return handleUnauthorizedError(req,next,token,spotifyService,router)
          }
        }
        return throwError(() => err);
      })
    )
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

function handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandlerFn, token: any, spotifyService:SpotifyService, router : Router){
   return spotifyService.getRefreshToken(token.refresh_token).pipe(
      switchMap((token: any)=>{
        localStorage.setItem("token",token);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token.access_token}` }
        });
        return next(req);
    }),
    catchError((err) => {
      if (err.status == '403' || err.status === '401') {
        router.navigate(['login']);
        localStorage.removeItem("token")
        localStorage.removeItem("code")
        localStorage.removeItem("current_user")
      }
      return throwError(() => err);
    })
  )
}