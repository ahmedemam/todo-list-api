import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Todo } from '@prisma/client';
import { CreateUpdateTodoDto } from './dto/create-update-todo';
import { TodoService } from './todo.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('todo')
@ApiTags('Todos APIs')
export class TodoController {
		constructor(private todoService: TodoService) {}

		@Get('/all')
		public async getGuestTodos(): Promise<any> {
			return await this.todoService.getAllTodos();
		}
		
    @UseGuards(AuthGuard('jwt'))
		@Get('/user/:id')
		public async getTodosByUserId(userId: number): Promise<any> {
			return await this.todoService.getTodosByUserId(userId);
		}

    @UseGuards(AuthGuard('jwt'))
		@Post('/create')
		public async createTodo(@Req() req: Request, @Body() todo: CreateUpdateTodoDto): Promise<Todo> {
			const userId = req.user.id;
			return await this.todoService.createTodo(userId, todo);
		}

		@UseGuards(AuthGuard('jwt'))
		@Post('/update/:id')
		public async updateTodo(@Req() req: Request, @Param(':id') todoId: number, @Body() todo: CreateUpdateTodoDto): Promise<Todo> {
			const userId = req.user.id;
			return await this.todoService.updateTodo(userId, todoId, todo);
		}

		@UseGuards(AuthGuard('jwt'))
		@Post('/delete/:id')
		public async deleteTodo(@Req() req: Request ,@Param(':id') todoId: number): Promise<Todo> {
			const userId = req.user.id;
			return await this.todoService.deleteTodo(userId, todoId);
		}

}
