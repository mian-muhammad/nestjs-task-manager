import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, owner: string): Promise<Task> {
    const createdTask = new this.taskModel({ ...createTaskDto, owner });
    return await createdTask.save();
  }

  async findAll(owner: string): Promise<Task[]> {
    return await this.taskModel.find({ owner });
  }

  async findOne(id: string, owner: string) {
    return await this.taskModel.findOne({ _id: id, owner });
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    owner: string,
  ): Promise<Task> {
    return await this.taskModel.findOneAndUpdate(
      { _id: id, owner },
      updateTaskDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string, owner: string): Promise<Task> {
    return await this.taskModel.findOneAndDelete({ _id: id, owner });
  }
}
