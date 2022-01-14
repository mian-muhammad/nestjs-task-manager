import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
})
export class TasksModule {}
