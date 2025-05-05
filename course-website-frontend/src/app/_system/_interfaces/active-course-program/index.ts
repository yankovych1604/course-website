export interface ActiveCourseProgramResponse {
  id: string
  courseId: string;
  modules: Module[];
  totalAmountOfTopics: number;
  totalAmountOfProjects: number;
  completedAt: string | null;
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
  isCompleted: boolean;
  deadline: string | null;
}
