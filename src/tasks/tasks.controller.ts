import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);

    if (task === undefined) {
      throw new NotFoundException({
        message: 'Task not found',
      });
    }

    return task;
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    const task = this.tasksService.createTask(
      newTask.title,
      newTask.description,
    );
    return task;
  }

  @Patch(':id')
  async editTask(@Param('id') id: string, @Body() updateTask: UpdateTaskDto) {
    const editedTask = await this.tasksService.updateTask(id, updateTask);

    if (!editedTask) {
      throw new NotFoundException({
        message: 'Task not found',
      });
    }

    return editedTask;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
