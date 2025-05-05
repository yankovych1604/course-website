export interface ReviewRequest {
  userId: string;
  courseId: string;
  rating: number;
  description: string;
  createdAt: Date;
}

export interface ReviewResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  courseId: string;
  rating: number;
  description: string;
  createdAt: Date;
  dateFormatted: Date;
}

export interface GroupedCourseReviews {
  courseId: string;
  courseTitle: string;
  reviews: ReviewResponse[];
  avgRating: number;
  currentPage: number;
  totalPages: number;
  paginatedReviews: ReviewResponse[];
}
