import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Board } from './entities/board.entity';
import { IResponseFromDB } from 'src/models/interfaces';
import { BoardDto } from './dto/board.dto';
import { errorHandler } from 'src/helpers/errorHandler';
import { ListsService } from 'src/lists/lists.service';
// import { List } from 'src/lists/entities/list.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    private readonly listsService: ListsService,
  ) {}

  async create(board: Board): Promise<IResponseFromDB<BoardDto>> {
    const boardResult = await errorHandler({
      action: 'added',
      entity: 'board',
      callback: () => this.boardsRepository.save(board),
    });
    return boardResult;
  }

  async findAll(): Promise<IResponseFromDB<BoardDto[]>> {
    const boardsResult = await errorHandler({
      action: 'got',
      entity: 'boards',
      callback: () => this.boardsRepository.find(),
    });
    const boards = boardsResult.data;
    const preparedBoards = boards.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return { ...boardsResult, data: preparedBoards };
  }

  async findOne(id: string): Promise<IResponseFromDB<BoardDto>> {
    const boardResult = await errorHandler({
      action: 'got',
      entity: 'board',
      callback: () => this.boardsRepository.findOneBy({ id }),
    });
    return boardResult;
  }

  async update(board: Board): Promise<IResponseFromDB<UpdateResult>> {
    const boardResult = await errorHandler({
      action: 'updated',
      entity: 'board',
      callback: () => this.boardsRepository.update(board.id, board),
    });
    return boardResult;
  }

  async remove(id: string): Promise<IResponseFromDB<DeleteResult>> {
    await this.listsService.removeListsByBoardId(id);
    return await errorHandler({
      action: 'deleted',
      entity: 'board',
      callback: () => this.boardsRepository.delete({ id }),
    });
  }
}
