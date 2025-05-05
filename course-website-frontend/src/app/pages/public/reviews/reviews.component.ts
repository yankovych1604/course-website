import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../../_system/_services/reviews/reviews.service';
import { GroupedCourseReviews } from '../../../_system/_interfaces/reviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  standalone: false
})

export class ReviewsComponent implements OnInit {
  reviewsPerPage: number = 3;
  groupedReviews: GroupedCourseReviews[] = [];

  constructor(
    private reviewsService: ReviewsService,
  ) {}

  ngOnInit(): void {
    this.reviewsService.getGroupedReviews().subscribe(grouped => {
      this.groupedReviews = grouped;
    });
  }

  changePage(courseId: string, page: number): void {
    const group = this.groupedReviews.find(g => g.courseId === courseId);
    if (group) {
      group.currentPage = page;
      const start = (page - 1) * this.reviewsPerPage;
      group.paginatedReviews = group.reviews.slice(start, start + this.reviewsPerPage);
    }
  }
}
