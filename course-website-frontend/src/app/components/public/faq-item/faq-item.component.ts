import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { FaqsResponse } from '../../../_system/_interfaces/faqs';

@Component({
  selector: 'app-faq-item',
  imports: [
    NgClass
  ],
  templateUrl: './faq-item.component.html',
  styleUrl: './faq-item.component.scss',
  standalone: true,
})

export class FaqItemComponent {
  @Input() faq?: FaqsResponse;
  @ViewChild('answerContent') answerContent!: ElementRef;

  public answerHeight: number = 0;
  public isAnswerOpened: boolean = false;

  openAnswerOfQuestion(): void {
    this.isAnswerOpened = !this.isAnswerOpened;

    const contentElement = this.answerContent.nativeElement;

    if (this.isAnswerOpened) {
      this.answerHeight = contentElement.scrollHeight;
    } else {
      this.answerHeight = 0;
    }
  }
}
