import { inject, PLATFORM_ID } from '@angular/core';
import { EMPTY } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../../_services/token/token.service';
import { SessionService } from '../../_services/session/session.service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const platformId = inject(PLATFORM_ID);
  const tokenService = inject(TokenService);
  const sessionService = inject(SessionService);

  if (isPlatformBrowser(platformId)) {
    const token = tokenService.token;
    const isApiRequest = request.url.includes('/api');

    if (isApiRequest) {
      const isTokenValid = token && !tokenService.isTokenExpired(token);

      if (!token || !isTokenValid) {
        sessionService.show();

        return EMPTY;
      }

      if (sessionService.isVisible) {
        return EMPTY;
      }

      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(cloned);
    }
  }

  return next(request);
};
