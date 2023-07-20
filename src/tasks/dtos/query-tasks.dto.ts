import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

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
  isDaily?: boolean;
}
