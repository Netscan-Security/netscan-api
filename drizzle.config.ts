import type { Config } from 'drizzle-kit';
import config from 'src/config';

export default {
  schema: './src/modules/drizzle/schema.ts',
  out: './src/modules/drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: config.databaseURL,
  },
} satisfies Config;
