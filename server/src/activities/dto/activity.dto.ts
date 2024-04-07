import { IsNotEmpty, IsString } from 'class-validator';

export class ActivityDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  boardId: string;

  @IsString()
  listId?: string;

  @IsString()
  taskId?: string;
}
