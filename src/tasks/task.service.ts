import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from 'src/database/database.service';
import { Task, Prisma} from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private db: DatabaseService) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.db.task.create({
      data: createTaskDto as unknown as Prisma.TaskCreateInput,
    });
  }

  findAllByUser(userId: number): Promise<Task[]> {
    return this.db.task.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number, user: { userId: number }): Promise<Task> {
    const task = await this.db.task.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Check if user has permission to view this task
    if (task.ownerId !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to access this task',
      );
    }

    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: { userId: number },
  ): Promise<Task> {
    // First check if the task exists and if the user has permission
    const task = await this.findOne(id, user);

    // Only allow the owner to update the task
    if (task.ownerId !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }

    return this.db.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number, user: { userId: number }): Promise<Task> {
    // First check if the task exists and if the user has permission
    const task = await this.findOne(id, user);

    // Only allow the owner to delete the task
    if (task.ownerId !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this task',
      );
    }

    return this.db.task.delete({
      where: { id },
    });
  }
}
