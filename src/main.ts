import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 3000;

// Check for required environment variables
if (!('DATABASE_URL' in process.env)) {
  throw new Error(
    ' ⚠️  DATABASE_URL environment variable is required for the application to run properly. Please check your environment variables. ⚠️ ',
  );
} else {
  Logger.log(`DATABASE_URL found in environment variables. ✅`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
