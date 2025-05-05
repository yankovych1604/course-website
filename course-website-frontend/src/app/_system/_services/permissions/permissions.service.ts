import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TokenService } from '../token/token.service';
import { SessionService } from '../session/session.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class PermissionsService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,

    private tokenService: TokenService,
    private sessionService: SessionService
  ) { }

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.tokenService.token;
      const isTokenValid = token && !this.tokenService.isTokenExpired(token);

      if (!token || !isTokenValid) {
        this.sessionService.show();

        return false;
      }

      return true;
    }

    return false;
  }
}
