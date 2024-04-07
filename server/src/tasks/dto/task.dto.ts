import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskActivity } from 'src/activities/entity/activities.entity';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  boardId: string;

  @IsString()
  @IsNotEmpty()
  listId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['low', 'medium', 'high', 'highest'])
  priority: string;

  @IsString()
  createdAt: string;

  @IsArray()
  activities: TaskActivity[];
}
