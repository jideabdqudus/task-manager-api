import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsISO8601,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status, Priority } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: Status,
    default: Status.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'The priority of the task',
    enum: Priority,
    default: Priority.MEDIUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiProperty({
    description: 'The due date of the task',
    required: false,
    example: '2025-04-07T21:39:47.228Z',
  })
  @IsOptional()
  @IsISO8601({ strict: false })
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

  ownerId?: number;
}
