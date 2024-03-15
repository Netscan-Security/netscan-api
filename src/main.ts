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

  const devOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:3001',
  ];
  const prodOrigins = process.env.CORS_DOMAINS
    ? process.env.CORS_DOMAINS.split(',')
    : [];

  app.enableCors({
    origin: function (origin, callback) {
      const allowedOrigins =
        process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins;
      if (!origin) {
        Logger.log('Request with no origin');
        return callback(null, true); // allow requests with no origin (like mobile apps or curl requests)
      }
      if (
        allowedOrigins.some((domain) => origin.startsWith(domain)) ||
        allowedOrigins.some((domain) => origin.includes(domain))
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`Server running on 👉 ${appUrl}:${port}`, 'Main');
  Logger.log(`Swagger running on 👉  ${appUrl}:${port}/docs`, 'Main');
  Logger.log('All Systems Go! 🚀', 'Main');
}
startServer();
