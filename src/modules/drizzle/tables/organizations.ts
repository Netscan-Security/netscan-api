import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core';
import { organizationUser } from './organizationUser';

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const organizationRelations = relations(organizations, ({ many }) => ({
  organizationUser: many(organizationUser),
}));
