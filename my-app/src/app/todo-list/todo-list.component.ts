import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { SubTask, Task } from '../task.model';
import { MyServiceService } from '../my-service.service';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  tasks: Task[] = [];
  newTask: string = '';
  newSubTask: string = '';
  editingTaskId: number | null = null;
  editedTaskName: string = '';
  

  constructor(private todoService: MyServiceService) {
    this.tasks = this.todoService.getTasks(); 
    console.log(this.tasks)
    // Get tasks from the service
  }

  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        id: Date.now(), // Generate a unique ID based on timestamp
        name: this.newTask,
        completed: false,
        subTasks: []
      };
      this.tasks.push(task);
      this.newTask = ''; // Clear the input field
    }
  }

  // Delete a task
  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  // Add a sub-task to a specific task
  addSubTask(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task && this.newSubTask.trim()) {
      const subTask: SubTask = {
        id: Date.now(),
        name: this.newSubTask,
        completed: false
      };
      task.subTasks.push(subTask);
      this.newSubTask = ''; // Clear the input field
    }
  }

  // Delete a sub-task
  deleteSubTask(taskId: number, subTaskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.subTasks = task.subTasks.filter(subTask => subTask.id !== subTaskId);
    }
  }

  // Edit a task's name
  startEditing(task: Task) {
    this.editingTaskId = task.id;
    this.editedTaskName = task.name;
  }

  saveEditedTask(task: Task) {
    if (this.editedTaskName.trim()) {
      task.name = this.editedTaskName;
      this.editingTaskId = null; // Stop editing
    }
  }

  // Toggle the completed state for a task
  toggleCompletion(task: Task) {
    task.completed = !task.completed;
  }

  // Toggle the completed state for a sub-task
  toggleSubTaskCompletion(task: Task, subTask: SubTask) {
    subTask.completed = !subTask.completed;
  }

  // Calculate the progress for a task (main task + sub-tasks)
  getProgress(task: Task): number {
    const total = task.subTasks.length;
    const completed = task.subTasks.filter(subTask => subTask.completed).length;
    return total ? (completed / total) * 100 : 0;
  }}