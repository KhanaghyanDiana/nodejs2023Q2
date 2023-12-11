import { Module } from '@nestjs/common';
import { LoggerService } from './loggerServise.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerServiceModule {}
