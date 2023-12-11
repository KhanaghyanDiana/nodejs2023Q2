import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './Logger/loggerServise.service';
const PORT = process.env.PORT;
const DOCKER_PORT = process.env.DOCKER_PORT;

async function bootstrap() {
  const pro = await NestFactory.create(AppModule);
  const logger = pro.get(LoggerService);
  logger.log({ name: 'Application starting...' });
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT || DOCKER_PORT, () => {
    console.log(`Port is running on ${PORT || DOCKER_PORT} `);
  });
}

bootstrap();
process.on('uncaughtException', async (error) => {
  const pro = await NestFactory.create(AppModule);
  const logger = pro.get(LoggerService);
  logger.err(error.message);
  process.exit(1);
});

process.on('unhandledRejection', async (reason) => {
  const pro = await NestFactory.create(AppModule);
  const logger = pro.get(LoggerService);
  logger.err(reason);
  process.exit(1);
});
