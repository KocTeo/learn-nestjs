import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';

@Controller('todo')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'lista todos os Todos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Todos',
    type: IndexTodoSwagger,
    isArray: true,
  })
  async findAll() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'criar um Todo' })
  @ApiResponse({
    status: 201,
    description: 'Novo Todo criado com sucesso',
    type: IndexTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  async create(@Body() data: CreateTodoDTO) {
    return await this.todoService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'listar um Todo específico' })
  @ApiResponse({
    status: 200,
    description: 'Dados do Todo retornado com sucesso',
    type: IndexTodoSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Todo não encontrado',
    type: NotFoundSwagger,
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'atualizar um Todo' })
  @ApiResponse({
    status: 200,
    description: 'Dados do Todo atualizado com sucesso',
    type: IndexTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Todo não encontrado',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateTodoDTO,
  ) {
    return await this.todoService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'deletar um Todo' })
  @ApiResponse({ status: 204, description: 'Todo deletado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Todo não encontrado',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
