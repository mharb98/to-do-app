import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @ApiPropertyOptional({
    description: 'Name of the task',
    example: 'Do the laundry',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the task',
    example: 'Get the laundry out the washing machine and hang it on the line',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Time of the task',
    example: new Date(),
    type: Date,
  })
  @IsOptional()
  @IsDateString()
  time?: Date;

  @ApiPropertyOptional({
    description: 'Is it a daily task',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isDaily?: boolean;
}
