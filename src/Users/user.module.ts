import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users_Crud } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users_Crud])], // understand this part
  controllers: [UserController],
  providers: [UserService, Users_Crud],
})
export class UserModule {}
