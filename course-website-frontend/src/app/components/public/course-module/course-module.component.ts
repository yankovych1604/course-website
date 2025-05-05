import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { TopicItemComponent } from '../topic-item/topic-item.component';
import { Module } from '../../../_system/_interfaces/course-program';

@Component({
  selector: 'app-course-module',
  imports: [
    TopicItemComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './course-module.component.html',
  styleUrl: './course-module.component.scss',
  standalone: true,
})
export class CourseModuleComponent {
  @Input() modules?: Module[];

  public visibleCount: number = 5;
  public isShowMoreClicked: boolean = false;

  toggleModulesVisibility() {
    this.isShowMoreClicked = !this.isShowMoreClicked;

    if (this.modules) {
      this.visibleCount = this.isShowMoreClicked ? this.modules.length : 5;
    }
  }
}
