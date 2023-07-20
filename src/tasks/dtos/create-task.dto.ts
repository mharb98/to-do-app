import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'Name of the task',
    example: 'Do the laundry',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the task',
    example: 'Get the laundry out the washing machine and hang it on the line',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Time of the task',
    example: new Date(),
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  time: Date;

  @ApiPropertyOptional({
    description: 'Is this a daily task',
    example: false,
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDaily: boolean;
}
