import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
@ApiTags('Authentication APIs')
export class AuthController {
    constructor(private authService: AuthService) {}

		@Post('register')
		async register(@Body() createUserDto: CreateUserDto): Promise<User> {
			return await this.authService.createUser(createUserDto);
		}

    @UseGuards(AuthGuard('jwt'))
  	@Post('login')
		public async login(@Req() request: Request, @Body() createUserDto: CreateUserDto): Promise<any> {
			console.log(request);
			return await this.authService.login(request, createUserDto);
		}
}
