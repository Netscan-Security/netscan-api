import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
Logger.log(`✌️ environment variables loaded! ✅`, 'Environment');

const requiredEnvVars = ['DATABASE_URL', 'OPEN_AI_API_KEY'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`⚠️  Missing required environment variable: ${envVar} ⚠️`);
  }
});

Logger.log('✌️ all required environment variables found! ✅', 'Environment');

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.DATABASE_URL,

  /**
   * Your OpenAI API stuff
   */
  openai: {
    apiKey: process.env.OPEN_AI_API_KEY,
    assistantModel: process.env.ASSISTANT_MODEL,
    chatModel: process.env.CHAT_MODEL,
  },
};
