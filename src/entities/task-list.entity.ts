import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from './task.entity';

export class TaskListEntity {
  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Total number of tasks ',
  })
  count: number;

  @ApiProperty({
    type: TaskEntity,
    isArray: true,
  })
  tasks: TaskEntity[];
}
