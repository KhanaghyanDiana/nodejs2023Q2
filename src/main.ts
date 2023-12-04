import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT;
const DOCKER_PORT = process.env.DOCKER_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT || DOCKER_PORT, () => {
    console.log(`Port is running on ${PORT || DOCKER_PORT} `);
  });
}

bootstrap();
