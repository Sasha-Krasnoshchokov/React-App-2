import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), ListsModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
