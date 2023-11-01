import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(title: string, description: string) {
    const task = new Task();

    task.id = v4();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.PENDING;

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, updatedFields: UpdateTaskDto): Task | boolean {
    const task = this.getTaskById(id);

    if (task === undefined) {
      return false;
    }

    const newTask = Object.assign(task, updatedFields);

    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));

    return newTask;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
