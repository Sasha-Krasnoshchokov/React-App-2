import { IsArray, IsNotEmpty, IsString, isArray } from 'class-validator';
import { TaskDto } from 'src/tasks/dto/task.dto';

export class ListDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  boardId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @IsArray()
  tasks?: TaskDto[];
}
