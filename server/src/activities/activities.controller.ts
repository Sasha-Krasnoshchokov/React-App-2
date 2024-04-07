import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ActivitiesService, TaskActivitiesService } from './activities.service';
import { ActivityDto } from './dto/activity.dto';
import { IResponseFromDB } from 'src/models/interfaces';
import { BoardActivity, TaskActivity } from './entity/activities.entity';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getActivities(): Promise<IResponseFromDB<BoardActivity[]>> {
    return this.activitiesService.getActivities();
  }

  @Get(':id')
  async getActivitiesByBoardId(@Param('id') id: string): Promise<IResponseFromDB<BoardActivity[]>> {
    return this.activitiesService.getActivitiesByBoardId(id);
  }

  @Post()
  async addActivity(@Body() body: ActivityDto): Promise<IResponseFromDB<BoardActivity>> {
    return this.activitiesService.addActivity(body);
  }
}

@Controller('taskActivities')
export class TaskActivitiesController {
  constructor(private readonly taskActivitiesService: TaskActivitiesService) {}

  @Get(':id')
  async getTaskActivities(
    @Param('id: taskId') taskId: string,
    @Query() { boardId, listId }: { boardId: string; listId: string },
  ): Promise<IResponseFromDB<TaskActivity[]>> {
    return this.taskActivitiesService.getTaskActivities(boardId, listId, taskId);
  }

  @Post()
  async addATaskActivity(@Body() body: ActivityDto): Promise<IResponseFromDB<TaskActivity>> {
    return this.taskActivitiesService.addActivity(body);
  }
}
