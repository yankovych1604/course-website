import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationEnd, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TokenService } from '../../../_system/_services/token/token.service';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  public selectedCategory: string = 'default';
  public isOpenedCourseMenu: boolean = false;
  public isOpenedNavigationMenu: boolean = false;
  public currentSubscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) {}

  ngOnInit() {
    if (this.tokenService.jwtToken$) {
      this.tokenService.jwtToken$.subscribe(token => {
        this.isLoggedIn = !!token;
      });
    } else {
      this.isLoggedIn = false;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.selectedCategory = 'default';
        }, 0);
      }
    });
  }

  ngOnDestroy() {
    if (this.currentSubscriptions.length > 0) {
      this.currentSubscriptions.forEach((sub: Subscription) => {
        sub.unsubscribe();
      })
    }
  }

  openNavigationMenu() {
    if (!this.isOpenedCourseMenu) {
      this.isOpenedNavigationMenu = !this.isOpenedNavigationMenu;
    }
  }

  openCourseMenu(isOpened: boolean) {
    this.isOpenedCourseMenu = isOpened;

    if (isOpened) {
      this.isOpenedNavigationMenu = false;
    }
  }

  navigateToCategory(category: string) {
    if (category !== 'default') {
      this.router.navigate(['/courses', category]);
    }
  }
}
