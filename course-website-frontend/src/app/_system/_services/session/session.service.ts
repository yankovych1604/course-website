import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public isVisible: boolean = false

  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) {}

  hide(): void {
    this.isVisible = false
  }

  show(): void {
    if (this.isVisible) {
      return;
    }

    this.isVisible = true;
  }

  exit(): void {
    this.tokenService.clearStorage();

    this.hide();
    this.router.navigate(['']);
  }

  signIn(): void {
    this.tokenService.clearStorage();

    this.hide();
    this.router.navigate(['/sign-in']);
  }
}
