import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { IMoveTo, IResponseFromDB } from 'src/models/interfaces';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskActivity } from 'src/activities/entity/activities.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() taskDto: TaskDto): Promise<IResponseFromDB<TaskDto>> {
    return await this.tasksService.create(taskDto);
  }

  @Get()
  async findAll(@Query() { boardId }: { boardId: string }): Promise<IResponseFromDB<TaskDto[]>> {
    return await this.tasksService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() { boardId }: { boardId: string }): Promise<IResponseFromDB<TaskDto>> {
    return this.tasksService.findOne(id, boardId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: TaskDto | IMoveTo,
  ): Promise<IResponseFromDB<UpdateResult | Task>> {
    if (id === 'move') {
      return await this.tasksService.moveTo(body as IMoveTo);
    }
    return await this.tasksService.update(body as TaskDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query() { boardId, listId }: { boardId: string; listId: string },
  ): Promise<IResponseFromDB<DeleteResult>> {
    return this.tasksService.remove(id, boardId, listId);
  }
}
