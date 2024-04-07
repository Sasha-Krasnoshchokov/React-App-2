import { Injectable } from '@nestjs/common';

import { ActivityDto } from './dto/activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardActivity, TaskActivity } from './entity/activities.entity';
import { Repository } from 'typeorm';
import { errorHandler } from 'src/helpers/errorHandler';
import { IResponseFromDB } from 'src/models/interfaces';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(BoardActivity)
    private activityRepository: Repository<BoardActivity>,
  ) {}

  getActivities(): Promise<IResponseFromDB<BoardActivity[]>> {
    return errorHandler({ action: 'got', entity: 'activities', callback: () => this.activityRepository.find() });
  }
  getActivitiesByBoardId(id: string): Promise<IResponseFromDB<BoardActivity[]>> {
    return errorHandler({
      action: 'got',
      entity: 'activities',
      callback: () => this.activityRepository.findBy({ boardId: id }),
    });
  }

  addActivity(activityDto: ActivityDto): Promise<IResponseFromDB<BoardActivity>> {
    let activity = new BoardActivity();
    activity = { ...activity, ...activityDto };
    return errorHandler({
      action: 'added',
      entity: 'activity',
      callback: () => this.activityRepository.save(activity),
    });
  }
}

@Injectable()
export class TaskActivitiesService {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}

  getTaskActivities(boardId: string, listId: string, taskId: string): Promise<IResponseFromDB<TaskActivity[]>> {
    return errorHandler({
      action: 'got',
      entity: 'activities',
      callback: () => this.taskActivityRepository.findBy({ taskId, listId, boardId }),
    });
  }
  addActivity(taskActivity: ActivityDto): Promise<IResponseFromDB<TaskActivity>> {
    return errorHandler({
      action: 'added',
      entity: 'activity',
      callback: () => this.taskActivityRepository.save(taskActivity),
    });
  }
}
