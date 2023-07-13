import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from '../todo.controller';
import { TodoService } from '../todo.service';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue,
            create: jest.fn().mockResolvedValue,
            findOneOrFail: jest.fn().mockResolvedValue,
            update: jest.fn().mockResolvedValue,
            deleteById: jest.fn().mockResolvedValue,
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return a todo list', async () => {
      return null;
    });

    it('should be return a error', async () => {
      return null;
    });
  });

  describe('create', () => {
    it('should create a todo', async () => {
      return null;
    });

    it('should return a error', async () => {
      return null;
    });
  });

  describe('findOneOrFail', () => {
    it('should return a todo', async () => {
      return null;
    });

    it('should return a error if not find a todo', async () => {
      return null;
    });

    it('should return a error', async () => {
      return null;
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      return null;
    });

    it('should return a error', async () => {
      return null;
    });
  });

  describe('deleteById', () => {
    it('should delete a todo', async () => {
      return null;
    });

    it('should return a error', async () => {
      return null;
    });
  });
});
