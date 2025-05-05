import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserResponse } from '../../../_system/_interfaces/user';
import { TokenService } from '../../../_system/_services/token/token.service';
import { UserStateService } from '../../../_system/_services/user-state/user-state.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  standalone: false,
})
export class AccountComponent implements OnInit, OnDestroy {
  public userData?: UserResponse;
  public currentUserSubscriptions: Subscription[] = [];

  constructor(
    private tokenService: TokenService,
    private userStateService: UserStateService,
  ) {}

  ngOnInit() {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      const loadUserSubscription = this.userStateService.loadUserById(userId).subscribe();
      this.currentUserSubscriptions.push(loadUserSubscription);

      const userSubscription = this.userStateService.currentUser$.subscribe(user => {
        if (user) {
          this.userData = user;
        }
      });
      this.currentUserSubscriptions.push(userSubscription);
    }
  }

  ngOnDestroy() {
    if (this.currentUserSubscriptions.length > 0) {
      this.currentUserSubscriptions.forEach((sub: Subscription) => {
        sub.unsubscribe();
      })
    }
  }

  logOut() {
    this.tokenService.clearStorage();
    this.userStateService.clearUser();
  }
}
