import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.PENDING])
  status?: TaskStatus;
}
