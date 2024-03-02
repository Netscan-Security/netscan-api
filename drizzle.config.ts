import type { Config } from 'drizzle-kit';
import config from 'src/config';

export default {
  schema: './src/modules/drizzle/schema.ts',
  out: './migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: config.databaseURL,
  },
} satisfies Config;
