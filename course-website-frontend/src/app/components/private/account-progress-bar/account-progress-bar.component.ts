import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-progress-bar',
  imports: [],
  templateUrl: './account-progress-bar.component.html',
  styleUrl: './account-progress-bar.component.scss',
  standalone: true,
})
export class AccountProgressBarComponent implements AfterViewInit {
  @Input() progress!: number;

  public animatedProgress: number = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.animatedProgress = this.progress;
    }, 10);
  }
}
