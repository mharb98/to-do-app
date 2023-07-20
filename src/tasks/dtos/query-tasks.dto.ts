import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  // IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum TasksKeys {
  guid = 'guid',
  isDaily = 'isDaily',
  name = 'name',
  time = 'time',
  createdAt = 'createdAt',
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}

export class QueryTasksDTO {
  @ApiPropertyOptional({
    description: 'Name of the task',
    example: 'Do the laundry',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Time of the task',
    example: new Date(),
    type: Date,
  })
  @IsOptional()
  @IsDateString()
  time?: Date;

  @ApiPropertyOptional({
    description: 'Is this a daily task',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isDaily?: boolean;

  @ApiPropertyOptional({
    description: 'Order by key',
    enum: TasksKeys,
    example: TasksKeys.guid,
    default: TasksKeys.guid,
  })
  @IsOptional()
  @IsEnum(TasksKeys)
  orderBy: TasksKeys;

  @ApiPropertyOptional({
    description: 'Order direction',
    enum: OrderDirection,
    example: OrderDirection.asc,
    default: OrderDirection.asc,
  })
  @IsOptional()
  @IsEnum(OrderDirection)
  orderDirection: OrderDirection;

  @ApiPropertyOptional({
    description: 'Page',
    type: Number,
    example: 1,
    default: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number;

  @ApiPropertyOptional({
    description: 'Size of page',
    type: Number,
    example: 20,
    default: 20,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Max(50)
  pageSize: number;
}
