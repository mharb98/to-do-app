import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDTO } from '../tasks/dtos/create-task.dto';
import { QueryTasksDTO } from '../tasks/dtos/query-tasks.dto';
import { UpdateTaskDTO } from '../tasks/dtos/update-task.dto';
import { Prisma } from '@prisma/client';
import { TaskListEntity } from '../entities/task-list.entity';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}
  taskSerializer = {
    guid: true,
    name: true,
    time: true,
    isDaily: true,
    description: true,
    createdAt: true,
  };

  async create(createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
    try {
      return await this.prisma.task.create({
        data: createTaskDTO,
        select: this.taskSerializer,
      });
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(
    guid: string,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<TaskEntity> {
    try {
      return await this.prisma.task.update({
        where: { guid: guid },
        data: updateTaskDTO,
        select: this.taskSerializer,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Requested task could not be found');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async query(queryTasksDTO: QueryTasksDTO): Promise<TaskListEntity> {
    const page = queryTasksDTO.page || 1;
    const pageSize = queryTasksDTO.pageSize || 20;
    try {
      const query: Prisma.TaskWhereInput = {
        name: { contains: queryTasksDTO.name, mode: 'insensitive' },
        time: queryTasksDTO.time,
        isDaily: queryTasksDTO.isDaily,
      };

      const count = await this.prisma.task.count({
        where: query,
      });

      const tasks: TaskEntity[] = await this.prisma.task.findMany({
        where: query,
        skip: page - 1,
        take: pageSize,
        select: this.taskSerializer,
      });

      return { count: count, tasks: tasks };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findUnique(guid: string): Promise<TaskEntity> {
    try {
      return await this.prisma.task.findFirstOrThrow({
        where: { guid: guid },
        select: this.taskSerializer,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Requested task could not be found');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async delete(guid: string): Promise<void> {
    try {
      await this.prisma.task.delete({
        where: { guid: guid },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Requested task could not be found');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
