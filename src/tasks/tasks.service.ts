import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { QueryTasksDTO } from './dtos/query-tasks.dto';

@Injectable()
export class TasksService {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<any> {
    console.log(createTaskDTO);
    return createTaskDTO;
  }

  async getTask(id: string): Promise<any> {
    console.log(id);
    return id;
  }

  async updateTask(id: string, updateTaskDTO: UpdateTaskDTO): Promise<any> {
    console.log(id);
    console.log(updateTaskDTO);
    return updateTaskDTO;
  }

  async queryTasks(queryTasksDTO: QueryTasksDTO): Promise<any> {
    console.log(queryTasksDTO);
    return queryTasksDTO;
  }

  async deleteTask(id: string): Promise<any> {
    console.log(id);
    return id;
  }
}
