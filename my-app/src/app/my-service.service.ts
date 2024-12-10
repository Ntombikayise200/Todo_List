import { Injectable } from '@angular/core';

import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor() { }

private tasks: Task[] = []; // This is where tasks will be stored



// Add a new task
addTask(name: string): void {
  const newTask: Task = {
    id: this.tasks.length + 1, // Simple ID generation
    name: name,
    completed: false,
    subTasks: []
  };
  this.tasks.push(newTask);
}

// Delete a task by ID
deleteTask(id: number): void {
  this.tasks = this.tasks.filter(task => task.id !== id);
}

// Get all tasks
getTasks(): Task[] {
  return this.tasks;
}
}