import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { QueryTasksDTO } from './dtos/query-tasks.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ description: 'Adds a new task to the to do list' })
  @ApiCreatedResponse({
    description: 'Task is created',
    type: TaskEntity,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong',
  })
  @HttpCode(201)
  @Post()
  async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
    return await this.tasksService.createTask(createTaskDTO);
  }

  @ApiOperation({ description: 'Query tasks created' })
  @ApiOkResponse({ description: 'Returns a list of tasks created' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Get()
  async queryTasks(@Query() queryTasksDTO: QueryTasksDTO): Promise<any> {
    return await this.tasksService.queryTasks(queryTasksDTO);
  }

  @ApiOperation({ description: 'Return a task by guid' })
  @ApiOkResponse({
    description: 'Returns the requested task',
    type: TaskEntity,
  })
  @ApiNotFoundResponse({ description: 'Requested task not found' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Get(':guid')
  async getTask(@Param('guid') guid: string): Promise<TaskEntity> {
    return await this.tasksService.getTask(guid);
  }

  @ApiOperation({ description: 'Update the requested task' })
  @ApiOkResponse({
    description: 'Record updated successfully',
    type: TaskEntity,
  })
  @ApiNotFoundResponse({ description: 'Requested task not found' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Put(':guid')
  async updateTask(
    @Param('guid') guid: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<TaskEntity> {
    return await this.tasksService.updateTask(guid, updateTaskDTO);
  }

  @ApiOperation({ description: 'Delete the requested task' })
  @ApiNoContentResponse({ description: 'Record deleted successfully' })
  @ApiNotFoundResponse({ description: 'Requested task not found' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Delete(':guid')
  async deleteTask(@Param('guid') guid: string): Promise<void> {
    await this.tasksService.deleteTask(guid);
  }
}
