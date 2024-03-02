import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'src/config';

const PORT = config.port || 3000;

async function startServer() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
startServer();
