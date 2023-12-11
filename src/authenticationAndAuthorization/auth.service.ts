import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../Logger/loggerServise.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authEntity: Repository<AuthEntity>,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
  ) {}
  async signUpService(login: string, hashedPass: string) {
    const isRegistered = await this.authEntity.save({
      login,
      password: hashedPass,
    });
    try {
      if (isRegistered) {
        return {
          data: isRegistered,
        };
      }
    } catch (error) {
      this.logger.err(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async loginUser(login: string, password: string, res: any) {
    const isUserExist = await this.authEntity.findOne({
      where: {
        login,
      },
    });
    const isEqual = await bcrypt.compare(password, isUserExist.password);
    //  whether the password is the same
    try {
      if (isEqual) {
        const jwt = await this.jwtService.signAsync(
          { login, userid: isUserExist.id },
          { secret: 'my-secret-key' },
        );
        const refreshToken = this.jwtService.sign(
          {
            login,
          },
          {
            secret: process.env.SECRET,
          },
        );
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).send({
          status: HttpStatus.OK,
          token: jwt,
          refreshToken,
        });
      } else {
        return res.status(403).send({
          status: HttpStatus.FORBIDDEN,
          token: 'no user with such login, password',
        });
      }
    } catch (e) {
      throw new HttpException('500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshUserToken(refreshToken: string) {
    const KEY = process.env.SECRET;
    const decoded = this.jwtService.verify(refreshToken, {
      secret: KEY,
    });
    const jwt = await this.jwtService.signAsync(
      { login: decoded.login },
      { secret: KEY },
    );
    try {
      if (decoded) {
        return {
          token: jwt,
        };
      }
    } catch (e) {
      throw new HttpException('500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
