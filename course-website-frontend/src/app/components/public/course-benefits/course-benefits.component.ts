import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BENEFITS } from '../../../_system/_constants';

@Component({
  selector: 'app-course-benefits',
  imports: [
    NgForOf
  ],
  templateUrl: './course-benefits.component.html',
  styleUrl: './course-benefits.component.scss',
  standalone: true,
})
export class CourseBenefitsComponent {
  public benefits: string[] = BENEFITS;
}
