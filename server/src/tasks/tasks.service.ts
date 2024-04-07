import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { IResponseFromDB } from 'src/models/interfaces';
import { TaskDto } from './dto/task.dto';
import { errorHandler } from 'src/helpers/errorHandler';
import { TaskActivitiesService } from 'src/activities/activities.service';
import { TaskActivity } from 'src/activities/entity/activities.entity';
import { ActivityDto } from 'src/activities/dto/activity.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private taskActivitiesService: TaskActivitiesService,
  ) {}

  async create(taskDto: TaskDto): Promise<IResponseFromDB<TaskDto>> {
    const task = { ...taskDto };
    await this.taskActivitiesService.addActivity({ ...task.activities[0], taskId: taskDto.id });
    delete task.activities;
    return await errorHandler({
      action: 'added',
      entity: 'task',
      callback: () => this.tasksRepository.save(task),
    });
  }

  async findAll(boardId?: string, listId?: string): Promise<IResponseFromDB<TaskDto[]>> {
    const tasksResult = await errorHandler({
      action: 'got',
      entity: 'tasks',
      callback: () => this.tasksRepository.findBy({ boardId, listId }),
    });

    const tasks = tasksResult.data;
    const activitiesPromises: Promise<any>[] = [];
    tasks.forEach((item) =>
      activitiesPromises.push(this.taskActivitiesService.getTaskActivities(item.boardId, item.listId, item.id)),
    );
    const allActivitiesOfTasks = await Promise.all(activitiesPromises);
    const preparedTasks = tasks
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((item, ind) => ({ ...item, activities: (allActivitiesOfTasks[ind].data || []) as TaskActivity[] }));
    return {
      ...tasksResult,
      data: preparedTasks,
    };
  }

  async findOne(id: string, boardId?: string, listId?: string): Promise<IResponseFromDB<TaskDto>> {
    const taskResult = await errorHandler({
      action: 'got',
      entity: 'task',
      callback: () => this.tasksRepository.findOneBy({ id, boardId, listId }),
    });
    const { data: activities } = await this.taskActivitiesService.getTaskActivities(boardId, listId, id);
    return {
      ...taskResult,
      data: {
        ...taskResult.data,
        activities: activities || [],
      },
    };
  }

  async update(taskDto: TaskDto): Promise<IResponseFromDB<UpdateResult>> {
    const task = { ...taskDto };
    const activitiesPromises: Promise<any>[] = [];
    task.activities.forEach((item) =>
      activitiesPromises.push(this.taskActivitiesService.addActivity({ ...item, taskId: taskDto.id })),
    );
    await Promise.all(activitiesPromises);

    delete task.activities;
    return await errorHandler({
      action: 'updated',
      entity: 'task',
      callback: () => this.tasksRepository.update([task.id, task.boardId, task.listId], task),
    });
  }

  async moveTo(data: {
    boardId: string;
    listId: string;
    taskId: string;
    newListId: string;
    activity: TaskActivity;
    status: string;
  }): Promise<IResponseFromDB<Task>> {
    const { boardId, listId, taskId, newListId, activity, status } = data;
    const currentTask = await this.findOne(taskId, boardId, listId);

    if (!currentTask?.data) {
      return {
        ...currentTask,
        data: null,
      };
    }
    const updatedTask = { ...currentTask.data, listId: newListId, activities: [activity], status };
    const updatedTaskResult = await this.update(updatedTask);
    if (!updatedTaskResult?.data) {
      return {
        ...currentTask,
        data: null,
      };
    }
    return { ...currentTask, data: updatedTask };
  }

  async remove(id: string, boardId?: string, listId?: string): Promise<IResponseFromDB<DeleteResult>> {
    const taskResult = await errorHandler({
      action: 'deleted',
      entity: 'task',
      callback: () => this.tasksRepository.delete({ id, boardId, listId }),
    });
    return taskResult;
  }

  async removeTasksByBoardIdListId(boardId: string, listId: string): Promise<IResponseFromDB<DeleteResult[]>> {
    const response = {
      data: [],
      error: null,
      success: true,
      message: `The board (${boardId}) tasks successfully deleted!`,
    };
    const { data: tasks } = await this.findAll(boardId, listId);
    if (tasks.length === 0) {
      return response;
    }
    const removeAllTasksPromise: Promise<any>[] = [];
    tasks.forEach((item) =>
      removeAllTasksPromise.push(
        this.tasksRepository.delete({ id: item.id, boardId: item.boardId, listId: item.listId }),
      ),
    );
    const deleteResult = await errorHandler({
      action: 'deleted',
      entity: 'tasks',
      callback: () => Promise.all(removeAllTasksPromise),
    });
    if (deleteResult.success) {
      return response;
    }
    return deleteResult;
  }
}
