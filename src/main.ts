import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

// Check for required environment variables
if (!('DATABASE_URL' in process.env)) {
  throw new Error(
    ' ⚠️  DATABASE_URL environment variable is required for the application to run properly. Please check your environment variables. ⚠️ ',
  );
} else {
  console.log('DATABASE_URL environment variable is present. ✅');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
