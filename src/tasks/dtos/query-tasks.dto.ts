import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

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
