import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SessionService } from '../../../_system/_services/session/session.service';

@Component({
  selector: 'app-session-expired',
  imports: [
    NgIf,
  ],
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.scss',
  standalone: true,
})
export class SessionExpiredComponent {

  constructor(
    public sessionService: SessionService
  ) {}

  onExit() {
    this.sessionService.exit();
  }

  onSignIn() {
    this.sessionService.signIn();
  }
}
