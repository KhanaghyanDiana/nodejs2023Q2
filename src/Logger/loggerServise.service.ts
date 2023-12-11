import { Injectable } from '@nestjs/common';
import { LoggerParamTypes } from './logger.types';

@Injectable()
export class LoggerService {
  log(loggerArgs: Partial<LoggerParamTypes>) {
    const { name, query, url, body } = loggerArgs;
    console.log(`${[name]}:URL is ${url} `);
    console.log(body, query);
  }
  err(message: any) {
    console.log(message, 'mes');
  }
}
