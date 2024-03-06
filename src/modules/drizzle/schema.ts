import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  uuid,
} from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

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

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const organizationUser = pgTable(
  'organization_user',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.organizationId] }),
    };
  },
);

// ! This is not working, Need ot fix relations. getting error when opening studio
// ! Error: There is not enough information to infer relation "__public__.organizations.organizationUser"
// export const organizationRelations = relations(organizations, ({ many }) => ({
//   organizationUser: many(organizationUser),
// }));

// export const usersRelations = relations(users, ({ many }) => ({
//   organizationUser: many(organizationUser),
// }));
