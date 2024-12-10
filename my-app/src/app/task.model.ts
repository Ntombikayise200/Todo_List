export interface Task {
    id: number;
    name: string;
    completed: boolean;
    subTasks: SubTask[]; // New property for sub-tasks
  }
  
  export interface SubTask {
    id: number;
    name: string;
    completed: boolean;
  }