export interface CoursesResponse {
  id: string;
  duration: number;
  url: string;
  title: string;
  difficulty_level: string;
  tutorId: string;
  description: string;
  new: boolean;
  popular: boolean;
  coded: boolean;
  nocoded: boolean;
  image: string;
}
