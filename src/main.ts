import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import config from 'src/config';

const { appUrl, port } = config;

async function startServer() {
  const app = await NestFactory.create(AppModule);

  const docConfig = new DocumentBuilder()
    .setTitle('Net Scan API')
    .setDescription('Net Scan API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:5173',
      'https://localhost:5173',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`Server running on 👉 ${appUrl}:${port}`, 'Main');
  Logger.log(`Swagger running on 👉  ${appUrl}:${port}/docs`, 'Main');
  Logger.log('All Systems Go! 🚀', 'Main');
}
startServer();
