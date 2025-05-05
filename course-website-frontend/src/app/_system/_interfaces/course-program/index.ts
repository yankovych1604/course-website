export interface CourseProgramResponse {
  id: string
  courseId: string;
  modules: Module[];
  totalAmountOfTopics: number;
  totalAmountOfProjects: number;
}

export interface Module {
  moduleId: string;
  title: string;
  description: string;
  countOfTopics: number;
  topics: Topic[];
}

export interface Topic {
  topicId: string;
  title: string;
}
