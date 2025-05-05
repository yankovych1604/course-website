import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import { Module, Topic } from '../../../_system/_interfaces/course-program';

@Component({
  selector: 'app-topic-item',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './topic-item.component.html',
  styleUrl: './topic-item.component.scss',
  standalone: true,
})
export class TopicItemComponent {
  @Input() module?: Module;
  @Input() topics?: Topic[];
  @ViewChild('detailsContent') detailsContent!: ElementRef;

  public detailsHeight: number = 0;
  public isDetailsOpened: boolean = false;

  openDetailsOfModule() {
    this.isDetailsOpened = !this.isDetailsOpened;

    const contentElement = this.detailsContent.nativeElement;

    if (this.isDetailsOpened) {
      this.detailsHeight = contentElement.scrollHeight;
    } else {
      this.detailsHeight = 0;
    }
  }
}
