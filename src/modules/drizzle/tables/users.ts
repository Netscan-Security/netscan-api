import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core';
import { organizationUser } from './organizationUser';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  contactNumber: text('contact_number').unique().notNull(),
  password: text('password').notNull(),
  imageUrl: text('image_url').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  organizationUser: many(organizationUser),
}));
