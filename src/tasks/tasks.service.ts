import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { QueryTasksDTO } from './dtos/query-tasks.dto';
import { TasksRepository } from '../repositories/tasks.repository';
import { TaskEntity } from '../entities/task.entity';
import { TaskListEntity } from '../entities/task-list.entity';

@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) {}

  async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
    return await this.repository.create(createTaskDTO);
  }

  async getTask(guid: string): Promise<TaskEntity> {
    return await this.repository.findUnique(guid);
  }

  async updateTask(
    guid: string,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<TaskEntity> {
    return await this.repository.update(guid, updateTaskDTO);
  }

  async queryTasks(queryTasksDTO: QueryTasksDTO): Promise<TaskListEntity> {
    return await this.repository.query(queryTasksDTO);
  }

  async deleteTask(guid: string): Promise<void> {
    await this.repository.delete(guid);
  }
}
