import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDate, IsString, IsInt } from 'class-validator';
import { Status, Priority } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'The status of the task',
    enum: Status,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'The priority of the task',
    enum: Priority,
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiProperty({ description: 'The due date of the task', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @ApiProperty({ description: 'The category of the task', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'The labels for the task (comma-separated)',
    required: false,
  })
  @IsOptional()
  @IsString()
  labels?: string;

  @ApiProperty({ description: 'The ID of the task owner', required: false })
  @IsOptional()
  @IsInt()
  ownerId?: number;
}
