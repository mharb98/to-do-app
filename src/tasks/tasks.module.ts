import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from '../repositories/tasks.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  imports: [PrismaModule],
})
export class TasksModule {}
