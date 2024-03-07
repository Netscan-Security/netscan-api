import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = drizzle<typeof schema>(pool);

const main = async () => {
  try {
    console.log('Seeding database');
    // Delete all data
    await db.delete(schema.organizationUser);
    await db.delete(schema.antivirus);
    await db.delete(schema.logs);
    await db.delete(schema.scans);
    await db.delete(schema.vulnerabilities);
    await db.delete(schema.hosts);
    await db.delete(schema.rooms);
    await db.delete(schema.buildings);
    await db.delete(schema.campuses);
    await db.delete(schema.organizations);
    await db.delete(schema.users);
    await db.delete(schema.scanTypes);

    console.log('Database cleared');

    // Seed data
    console.log('Seeding data');
    await db.insert(schema.users).values([
      {
        id: 'aaaabbbb-1111-2222-3333-ccccdddd1234',
        firstName: 'Alice',
        lastName: 'Johnson',
        username: 'alice_johnson',
        email: 'alice.johnson@example.com',
        contactNumber: '1234567890',
        password: 'password123',
        imageUrl: 'http://example.com/alice.jpg',
        role: 'user',
      },
      {
        id: 'aaaabbbb-4444-5555-6666-ccccdddd5678',
        firstName: 'Bob',
        lastName: 'Smith',
        username: 'bob_smith',
        email: 'bob.smith@example.com',
        contactNumber: '0987654321',
        password: 'password456',
        imageUrl: 'http://example.com/bob.jpg',
        role: 'admin',
      },
    ]);

    await db.insert(schema.organizations).values([
      {
        id: 'aaaabbbb-7777-8888-9999-ccccddddeeee',
        name: 'Example Organization',
      },
    ]);

    await db.insert(schema.organizationUser).values([
      {
        userId: 'aaaabbbb-1111-2222-3333-ccccdddd1234',
        organizationId: 'aaaabbbb-7777-8888-9999-ccccddddeeee',
      },
      {
        userId: 'aaaabbbb-4444-5555-6666-ccccdddd5678',
        organizationId: 'aaaabbbb-7777-8888-9999-ccccddddeeee',
      },
    ]);

    // Add more seeding for other tables if needed

    console.log('Database seeded successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed database');
  }
};

main();
