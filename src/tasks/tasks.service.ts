import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks() {
    return await this.tasksRepository.find();
  }

  async getTaskById(id: string) {
    return await this.tasksRepository.findOneBy({ id });
  }

  async createTask(title: string, description: string) {
    const task = new Task();

    task.title = title;
    task.description = description;

    await this.tasksRepository.save(task);

    return task;
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto) {
    const task = await this.getTaskById(id);

    if (task === null) {
      return false;
    }

    await this.tasksRepository.save(Object.assign(task, updatedFields));

    return task;
  }

  async deleteTask(id: string) {
    await this.tasksRepository.delete(id);
  }
}
