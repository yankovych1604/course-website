import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'token';

  public jwtToken!: Observable<string | null>;
  public jwtToken$!: BehaviorSubject<string | null>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.jwtToken$ = new BehaviorSubject<string | null>(localStorage.getItem(this.tokenKey));
      this.jwtToken = this.jwtToken$.asObservable();
    }
  }

  public set token(token: string | null) {
    if (isPlatformBrowser(this.platformId)) {
      if (token) {
        localStorage.setItem(this.tokenKey, token);
        this.jwtToken$?.next(token);
      }
    }
  }

  public get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.jwtToken$?.value;
    }
    return null;
  }

  public isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload?.exp) return true;

    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  }

  public decodeToken(token: string): any | null {
    try {
      const [, payload] = token.split('.');
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  public getUserIdFromToken(): string | null {
    const token = this.token;
    if (!token || this.isTokenExpired(token)) {
      return null;
    }

    const decoded = this.decodeToken(token.replace(/^Bearer\s/, ''));
    return decoded?.id || null;
  }

  public clearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.jwtToken$?.next(null);
    }
  }
}
