import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUpdateTodoDto } from './dto/create-update-todo';

@Injectable()
export class TodoService {
    constructor(private prismaService: PrismaService) {}
		
		public async getTodosByUserId(userId: number): Promise<any> {
			return await this.prismaService.todo.findMany({where: {author: {id: userId}}});
		}

		public async getAllTodos(): Promise<Todo[]> {
			return await this.prismaService.todo.findMany();
		}

		public async createTodo(userId: number,todo: CreateUpdateTodoDto): Promise<Todo> {
			return await this.prismaService.todo.create({data: {
				title: todo.title,
				done: todo.done,
				authorId: userId
			}});
		}

		public async updateTodo(userId: number, todoId: number, todo: CreateUpdateTodoDto): Promise<Todo> {
			return await this.prismaService.todo.update({where: {id: todoId}, data: {
				title: todo.title,
				done: todo.done
			}});
		}

		public async deleteTodo(userId: number, todoId: number): Promise<Todo> {
			return await this.prismaService.todo.delete({where: {id: todoId}});
		}

		public async getTodoById(userId: number, todoId: number): Promise<Todo> {
			return await this.prismaService.todo.findUnique({where: {id: todoId}});
		}
}
