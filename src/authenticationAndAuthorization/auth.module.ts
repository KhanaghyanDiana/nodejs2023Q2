import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { AuthService } from './auth.service';
import { LoggerService } from '../Logger/loggerServise.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  providers: [AuthService, LoggerService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
