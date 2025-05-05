export interface RegisteredUserResponse {
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedCourses: SelectedCourse[],
  certification: string[];
}

export interface SelectedCourse {
  id: string;
  meta: string;
  program: string;
}
