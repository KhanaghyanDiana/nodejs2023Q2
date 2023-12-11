import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { LoggerService } from '../Logger/loggerServise.service';
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post('/signup')
  async signUpReq(
    @Body('login') login: string,
    @Body('password') password: string,
    @Req() req: any,
  ) {
    const loggerArgs = {
      name: AuthController.name,
      url: req.url,
      body: {
        login,
        password,
      },
      query: null,
    };
    //  logger
    this.logger.log(loggerArgs);
    const hash = await bcrypt.hash(password, 10);
    return this.authService.signUpService(login, hash);
  }
  @Post('/login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
    @Res() res: any,
    @Req() req: any,
  ) {
    const loggerArgs = {
      name: AuthController.name,
      url: req.url,
      body: {
        login,
        password,
      },
      query: null,
    };
    //  logger
    this.logger.log(loggerArgs);
    return this.authService.loginUser(login, password, res);
  }
  @Post('/refresh')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Req() req: any,
  ) {
    const loggerArgs = {
      name: AuthController.name,
      url: req.url,
      body: {
        refreshToken,
      },
      query: null,
    };
    //  logger
    this.logger.log(loggerArgs);
    return this.authService.refreshUserToken(refreshToken);
  }
}
