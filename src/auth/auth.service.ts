import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import {sign, verify} from 'jsonwebtoken';


@Injectable()
export class AuthService {
 	 private readonly JWT_SECRET_KEY = 'secret';

		constructor(private prismaService: PrismaService) {}

		public async createUser(createUserDto: CreateUserDto): Promise<User> {
			const hashPassword = await bcrypt.hash(createUserDto.password, 10);
			return await this.prismaService.user.create({
				data: {
					name: createUserDto.name,
					email: createUserDto.email,
					password: hashPassword,
				}
			})
		}


		public async login(request: Request, createUserDto: CreateUserDto): Promise<any> {
			const user = await this.prismaService.user.findUnique({where: {email: createUserDto.email}});
			if (!user) {
				return null;
			}
			const isPasswordMatch = await bcrypt.compare(createUserDto.password, user.password);
			if (isPasswordMatch) {
				const payload = { username: user.name, sub: user.id };
				return {access_token: sign(payload, this.JWT_SECRET_KEY)};
			}
			return null;
		}
}
