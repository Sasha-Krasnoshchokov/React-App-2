import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';
import { Board } from './entities/board.entity';
import { IResponseFromDB } from 'src/models/interfaces';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() boardDto: BoardDto | Board): Promise<IResponseFromDB<BoardDto>> {
    return await this.boardsService.create(boardDto);
  }

  @Get()
  async findAll(): Promise<IResponseFromDB<BoardDto[]>> {
    return await this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponseFromDB<BoardDto>> {
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() boardDto: BoardDto): Promise<IResponseFromDB<UpdateResult>> {
    return await this.boardsService.update(boardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponseFromDB<DeleteResult | null>> {
    return this.boardsService.remove(id);
  }
}
