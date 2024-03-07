import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  uuid,
} from 'drizzle-orm/pg-core';

// Users
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

// Organizations
export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Organization User
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

// Hosts table
export const hosts = pgTable('hosts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  userId: uuid('user_id').references(() => users.id),
  roomId: uuid('room_id').references(() => rooms.id),
  cpu: text('cpu').notNull(),
  memory: text('memory').notNull(),
  gpu: text('gpu').notNull(),
  hardDisk: text('hard_disk').notNull(),
  os: text('os').notNull(),
  model: text('model').notNull(),
  ipAddress: text('ip_address').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Antivirus table
export const antivirus = pgTable('antivirus', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  host: uuid('host').references(() => hosts.id),
  dbVersion: text('db_version').notNull(),
  lastUpdate: timestamp('last_update').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Logs table
export const logs = pgTable('logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  host: uuid('host').references(() => hosts.id),
  log: text('log').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Campus table
export const campuses = pgTable('campuses', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Buildings table
export const buildings = pgTable('buildings', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  campusId: uuid('campus_id').references(() => campuses.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Rooms table
export const rooms = pgTable('rooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  buildingId: uuid('building_id').references(() => buildings.id),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Vulnerabilities table
export const vulnerabilities = pgTable('vulnerabilities', {
  id: uuid('id').defaultRandom().primaryKey(),
  target: text('target').notNull(),
  type: text('type').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ScanTypes table
export const scanTypes = pgTable('scan_types', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Scan
export const scans = pgTable('scans', {
  id: uuid('id').defaultRandom().primaryKey(),
  host: uuid('host').references(() => hosts.id),
  status: text('status').notNull(),
  scanType: uuid('scan_type').references(() => scanTypes.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ! This is not working, Need ot fix relations. getting error when opening studio
// ! Error: There is not enough information to infer relation "__public__.organizations.organizationUser"
// export const organizationRelations = relations(organizations, ({ many }) => ({
//   organizationUser: many(organizationUser),
// }));

// export const usersRelations = relations(users, ({ many }) => ({
//   organizationUser: many(organizationUser),
// }));
