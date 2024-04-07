import { Module } from '@nestjs/common';
import { ActivitiesService, TaskActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardActivity, TaskActivity } from './entity/activities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardActivity, TaskActivity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, TaskActivitiesService],
  exports: [ActivitiesService, TaskActivitiesService],
})
export class ActivitiesModule {}
