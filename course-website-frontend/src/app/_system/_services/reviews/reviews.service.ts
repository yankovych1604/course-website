import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupedCourseReviews, ReviewRequest } from '../../_interfaces/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL;

  private api = {
    reviews: `${this.resourceUrl}reviews`
  }

  constructor(
    private http: HttpClient,
  ) { }

  createReview(reviewData: ReviewRequest): Observable<ReviewRequest> {
    return this.http.post<ReviewRequest>(`${this.api.reviews}`, reviewData);
  }

  getGroupedReviews(): Observable<GroupedCourseReviews[]> {
    return this.http.get<GroupedCourseReviews[]>(`${this.api.reviews}/grouped`);
  }
}
