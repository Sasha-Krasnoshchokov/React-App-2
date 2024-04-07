import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), TasksModule],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [TypeOrmModule, ListsService],
})
export class ListsModule {}
