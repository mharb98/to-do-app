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

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ description: 'Adds a new task to the to do list' })
  @ApiCreatedResponse({
    description: 'Task is created',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong',
  })
  @HttpCode(201)
  @Post()
  async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<any> {
    return await this.tasksService.createTask(createTaskDTO);
  }

  @ApiOperation({ description: 'Query tasks created' })
  @ApiOkResponse({ description: 'Returns a list of tasks created' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Get()
  async queryTasks(@Query() queryTasksDTO: QueryTasksDTO): Promise<any> {
    return await this.tasksService.queryTasks(queryTasksDTO);
  }

  @ApiOperation({ description: 'Return a task by id' })
  @ApiOkResponse({ description: 'Returns the requested task' })
  @ApiNotFoundResponse({ description: 'Requested task not found' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Get(':id')
  async getTask(@Param('id') id: string) {
    return await this.tasksService.getTask(id);
  }

  @ApiOperation({ description: 'Update the requested task' })
  @ApiOkResponse({ description: 'Record updated successfully' })
  @ApiNotFoundResponse({ description: 'Requested task not found' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    return await this.tasksService.updateTask(id, updateTaskDTO);
  }

  @ApiOperation({ description: 'Delete the requested task' })
  @ApiNoContentResponse({ description: 'Record deleted successfully' })
  @ApiNotFoundResponse({ description: 'Requested task not found' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }
}
