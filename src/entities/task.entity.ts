import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';

export class TaskEntity implements Partial<Task> {
  @ApiProperty({
    type: String,
    example: '627f2568-26f7-11ee-be56-0242ac120002',
    description: 'Globally unique identifier for record',
  })
  guid: string;

  @ApiProperty({
    type: String,
    example: 'Do the laundry',
    description: 'Name of the task',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Get the laundry out the washing machine and hang it on the line',
    description: 'Description of the task',
  })
  description: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Date of the task',
  })
  time: Date;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is it a daily task',
  })
  isDaily: boolean;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Creation date of the task',
  })
  createdAt: Date;
}
