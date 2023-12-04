import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private users: UserService) {}

  @Get()
  getUSer() {
    return this.users.getAllUsers();
  }
  @Get(':id')
  fetchUserById(@Param('id') id: string) {
    return this.users.getUserById(id);
  }
  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.users.updateUserPassword(id, oldPassword, newPassword);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.users.deleteUserById(id)

  }
  @Post()
  postUser(@Body('login') login: string, @Body('password') password: string) {
    return this.users.addUser(login, password);
  }
}
