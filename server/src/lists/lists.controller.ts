import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListDto } from './dto/list.dto';
import { List } from './entities/list.entity';
import { IResponseFromDB } from 'src/models/interfaces';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('Lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(@Body() ListDto: ListDto | List): Promise<IResponseFromDB<ListDto>> {
    return await this.listsService.create(ListDto);
  }

  @Get()
  async findAll(@Query() { boardId }: { boardId: string }): Promise<IResponseFromDB<ListDto[]>> {
    return await this.listsService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() { boardId }: { boardId: string }): Promise<IResponseFromDB<ListDto>> {
    return this.listsService.findOne(id, boardId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() ListDto: ListDto): Promise<IResponseFromDB<UpdateResult>> {
    return await this.listsService.update(ListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query() { boardId }: { boardId: string }): Promise<IResponseFromDB<DeleteResult>> {
    return this.listsService.remove(id, boardId);
  }
}
