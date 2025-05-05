export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: RegisteredUser;
}

export interface RegisteredUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedCourses: { meta: string, program: string }[],
  certification: string[];
}
