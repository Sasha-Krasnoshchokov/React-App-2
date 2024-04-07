import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { List } from './entities/list.entity';
import { IResponseFromDB } from 'src/models/interfaces';
import { ListDto } from './dto/list.dto';
import { errorHandler } from 'src/helpers/errorHandler';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskDto } from 'src/tasks/dto/task.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    private readonly tasksService: TasksService,
  ) {}

  async create(listDto: ListDto): Promise<IResponseFromDB<ListDto | List>> {
    const list = { ...listDto };
    delete list.tasks;
    const listResult = await errorHandler({
      action: 'added',
      entity: 'list',
      callback: () => this.listsRepository.save(list),
    });
    return listResult;
  }

  async findAll(boardId: string): Promise<IResponseFromDB<ListDto[]>> {
    const listsResult = await errorHandler({
      action: 'got',
      entity: 'lists',
      callback: () => (!boardId ? this.listsRepository.find() : this.listsRepository.findBy({ boardId })),
    });

    const lists = listsResult.data;
    const tasksPromises: Promise<any>[] = [];
    lists.forEach((item) => tasksPromises.push(this.tasksService.findAll(item.boardId, item.id)));
    const allTasksOfList = await Promise.all(tasksPromises);
    const preparedLists = lists
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((item, ind) => ({ ...item, tasks: allTasksOfList[ind].data as TaskDto[] }));
    return { ...listsResult, data: preparedLists };
  }

  async findOne(id: string, boardId: string): Promise<IResponseFromDB<ListDto>> {
    const listResult = await errorHandler({
      action: 'got',
      entity: 'list',
      callback: () => this.listsRepository.findOneBy({ id, boardId }),
    });
    return listResult;
  }

  async update(list: List): Promise<IResponseFromDB<UpdateResult>> {
    const listResult = await errorHandler({
      action: 'updated',
      entity: 'list',
      callback: () => this.listsRepository.update([list.id, list.boardId], list),
    });
    return listResult;
  }

  async remove(id: string, boardId: string): Promise<IResponseFromDB<DeleteResult>> {
    const listResult = await errorHandler({
      action: 'deleted',
      entity: 'list',
      callback: () => this.listsRepository.delete({ id, boardId }),
    });
    return listResult;
  }

  async removeListsByBoardId(boardId: string): Promise<IResponseFromDB<DeleteResult[]>> {
    const response = {
      data: [],
      error: null,
      success: true,
      message: `The board (${boardId}) lists successfully deleted!`,
    };
    const { data: lists } = await this.findAll(boardId);
    if (lists.length === 0) {
      return response;
    }
    const removeAllListsPromise = [];
    lists.forEach((item) =>
      removeAllListsPromise.push(this.listsRepository.delete({ id: item.id, boardId: item.boardId })),
    );
    const deleteResult = await errorHandler({
      action: 'deleted',
      entity: 'lists',
      callback: () => Promise.all(removeAllListsPromise),
    });
    if (deleteResult.success) {
      return response;
    }
    return deleteResult;
  }
}
