import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ActivitiesModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule, TasksService],
})
export class TasksModule {}
