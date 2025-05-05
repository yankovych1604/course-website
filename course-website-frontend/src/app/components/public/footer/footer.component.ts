import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { COURSES } from '../../../_system/_constants';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {
  public courses: {name: string, url: string}[] = COURSES;
}
