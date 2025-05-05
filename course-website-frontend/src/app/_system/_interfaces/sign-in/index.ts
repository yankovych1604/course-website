export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: SignedInUser;
}

export interface SignedInUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedCourses: { meta: string, program: string }[],
  certification: string[];
}
