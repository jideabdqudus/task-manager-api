import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
