import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users_Crud } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, User } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users_Crud)
    private readonly usersEntity: Repository<Users_Crud>,
  ) {}
  async getAllUsers() {
    const allUsers = await this.usersEntity.find();
    if (allUsers) {
      return {
        data: allUsers,
        status: HttpStatus.OK,
      };
    }
  }
  async addUser(
    login: string,
    password: string,
  ): Promise<{ data?: CreateUserDto; status: number; mes?: string }> {
    const userIsAdded = await this.usersEntity.save({ login, password });

    if (login && password) {
      return { data: userIsAdded, status: HttpStatus.CREATED };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        mes: 'BAD_REQUEST',
      };
    }
  }

  async getUserById(id: string) {
    const perUser = await this.usersEntity.findOne({ where: { id } });
    if (!perUser) {
      return {
        mes: 'NOT FOUND',
        status: HttpStatus.NOT_FOUND,
      };
    } else if (typeof id !== 'string') {
      throw new HttpException('Specify correct format', HttpStatus.BAD_REQUEST);
    } else {
      return {
        data: perUser,
        status: HttpStatus.OK,
      };
    }
  }

  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<{
    data?: Partial<User>;
    status?: number;
    mes?: string;
  }> {
    const user = await this.usersEntity.findOne({ where: { id } });
    user.version++;
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        mes: 'User not found',
      };
    }
    if (user.password === oldPassword) {
      const updatedPass = { ...user, password: newPassword };
      return {
        data: updatedPass,
        status: HttpStatus.OK,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        mes: 'BAD_REQUEST',
      };
    }
  }
  async deleteUserById(id: string) {
    const user = await this.usersEntity.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (id) {
      const isDeleted = await this.usersEntity.remove(user);
      if (isDeleted && id) {
        return {
          status: HttpStatus.NO_CONTENT,
          mes: 'USER IS DELETED',
        };
      }
    }
  }
}
