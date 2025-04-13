import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiBearerAuth()
  create(@Request() req: unknown, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create({
      ...createTaskDto,
      ownerId: (req as { user: { userId: number } }).user.userId,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'The tasks have been successfully retrieved.',
  })
  @ApiBearerAuth()
  findAll(@Request() req: unknown) {
    return this.tasksService.findAllByUser(
      (req as { user: { userId: number } }).user.userId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully retrieved.',
  })
  @ApiBearerAuth()
  findOne(@Request() req: unknown, @Param('id') id: string) {
    return this.tasksService.findOne(
      +id,
      (req as { user: { userId: number } }).user,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @ApiBearerAuth()
  update(
    @Request() req: unknown,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      +id,
      updateTaskDto,
      (req as { user: { userId: number } }).user,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiBearerAuth()
  remove(@Request() req: unknown, @Param('id') id: string) {
    return this.tasksService.remove(
      +id,
      (req as { user: { userId: number } }).user,
    );
  }
}
