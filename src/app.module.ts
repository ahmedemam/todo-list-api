import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { JwtStrategy } from './auth/jw.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    AuthModule,
    TodoModule,
    PassportModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: '1200s' },
    }),

  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
