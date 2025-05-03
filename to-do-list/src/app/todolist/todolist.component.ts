import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Define a Task interface for better type safety
interface Task {
  taskName: string;
  isCompleted: boolean;
  dueDate?: string;
  dueTime?: string;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  // Initialize with a sample task
  taskArray: Task[] = [
    {
      taskName: 'Brush teeth',
      isCompleted: false,
      dueDate: '2023-05-03',
      dueTime: '08:00'
    }
  ];

  // Get today's date in YYYY-MM-DD format for min date attribute
  today: string = new Date().toISOString().split('T')[0];

  // Track which task is being edited
  editIndex: number = -1;

  // Store the task being edited
  editTask: Task = {
    taskName: '',
    isCompleted: false,
    dueDate: '',
    dueTime: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    // Create a new task with the form values
    const newTask: Task = {
      taskName: form.value.task,
      isCompleted: false,
      dueDate: form.value.dueDate,
      dueTime: form.value.dueTime
    };

    // Add the new task to the array
    this.taskArray.push(newTask);

    // Reset the form
    form.reset();
  }

  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

  // Start editing a task
  onEdit(index: number) {
    this.editIndex = index;

    // Create a copy of the task to edit (to avoid direct modification)
    this.editTask = {
      taskName: this.taskArray[index].taskName,
      isCompleted: this.taskArray[index].isCompleted,
      dueDate: this.taskArray[index].dueDate,
      dueTime: this.taskArray[index].dueTime
    };
  }

  // Cancel editing
  onCancelEdit() {
    this.editIndex = -1;
  }

  // Save the edited task
  onSaveEdit() {
    if (this.editTask.taskName.trim() !== '') {
      // Update the task in the array
      this.taskArray[this.editIndex] = {
        taskName: this.editTask.taskName,
        isCompleted: this.editTask.isCompleted,
        dueDate: this.editTask.dueDate,
        dueTime: this.editTask.dueTime
      };

      // Exit edit mode
      this.editIndex = -1;
    }
  }

}
