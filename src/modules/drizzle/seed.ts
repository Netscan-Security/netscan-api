import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';

const connectionString =
  environment === 'production'
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL;

const maxValues = 50;

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
    await seedData();

    console.log('Database seeded successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed database');
  }
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedData() {
  const users = [];
  const organizations = [];
  const organizationUser = [];
  const campuses = [];
  const buildings = [];
  const rooms = [];
  const hosts = [];
  const scanTypes = [];
  const logs = [];
  const scans = [];
  const vulnerabilities = [];
  const antivirus = [];

  const numLogs = 100; // Adjust the number of logs to generate
  const minUsersOrOrganizations = 6;

  // Generate Users with Faker
  for (let i = 0; i < randomInt(minUsersOrOrganizations, maxValues); i++) {
    // Adjust count as needed
    const user = {
      id: faker.string.uuid(),
      firstName: i === 0 ? 'John' : faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: i === 0 ? 'johndoe' : faker.internet.userName(),
      email: faker.internet.email(),
      password: 'hashed_password', // Replace with actual password hashing logic
      imageUrl: faker.image.avatar(),
      role: faker.helpers.arrayElement(['admin', 'user']),
      contactNumber: faker.phone.number(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };
    users.push(user);
  }

  // Generate Organizations
  for (let i = 0; i < randomInt(minUsersOrOrganizations, maxValues); i++) {
    // Adjust count as needed
    const organization = {
      id: faker.string.uuid(),
      name: i === 0 ? 'Acme Corp' : faker.company.name(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };
    organizations.push(organization);
  }

  // Generate Organization User relations (assuming John Doe belongs to Acme Corp)
  organizationUser.push({
    userId: users.find((user) => user.username === 'johndoe').id,
    organizationId: organizations.find((org) => org.name === 'Acme Corp').id,
  });

  //   check the users generated and the organizations generated and for each user, assign an organization to them
  // there could be a random number of users and organizations, so we need to loop through the users and assign an organization to them
  //   make sure to avoid assigning the same organization to multiple users
  for (let i = 0; i < 5; i++) {
    if (organizationUser.find((orgUser) => orgUser.userId === users[i].id)) {
      continue;
    }
    organizationUser.push({
      userId: users[i].id,
      organizationId: organizations[i].id,
    });
  }

  // Generate Campuses
  for (let i = 0; i < randomInt(1, maxValues); i++) {
    // Adjust count as needed
    const campus = {
      id: faker.string.uuid(),
      name: faker.location.street(), // Replace with more descriptive campus name
      //   select a random organization for the campus
      organizationId:
        organizations[Math.floor(Math.random() * organizations.length)].id,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };
    campuses.push(campus);
  }

  // Generate Buildings
  for (let i = 0; i < randomInt(1, maxValues); i++) {
    // Adjust count as needed
    const building = {
      id: faker.string.uuid(),
      name: `Building ${i + 1}`,
      campusId: campuses[Math.floor(Math.random() * campuses.length)].id, // Select a random campus for the building
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };
    buildings.push(building);
  }

  // Generate Rooms
  for (let i = 0; i < randomInt(1, maxValues); i++) {
    // Adjust count as needed
    const room = {
      id: faker.string.uuid(),
      buildingId: buildings[Math.floor(Math.random() * buildings.length)].id, // Select a random building for the room
      name:
        faker.location.buildingNumber() +
        ' ' +
        faker.location.secondaryAddress(), // Replace with more descriptive room name
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };
    rooms.push(room);
  }

  // Generate Hosts
  for (let i = 0; i < randomInt(1, maxValues); i++) {
    // Adjust count as needed
    const host = {
      id: faker.string.uuid(),
      name: faker.music.songName(),
      userId: users[Math.floor(Math.random() * users.length)].id, // Select a random user as the host owner
      roomId: rooms[Math.floor(Math.random() * rooms.length)].id, // Select a random room for the host
      cpu: faker.number.int(),
      memory: faker.number.bigInt(1024) + ' GB', // Generate random memory size
      gpu: faker.datatype.boolean() ? faker.number.int() : 'No GPU',
      hardDisk: faker.number.bigInt(1024) + ' TB', // Generate random hard disk size
      os: faker.helpers.arrayElement(['Windows', 'Linux', 'Mac OS']),
      model: faker.music.songName(),
      ipAddress: faker.internet.ip(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };
    hosts.push(host);
  }
  //   print length of hosts
  console.log('hosts', hosts.length);

  // Generate Scan Types
  scanTypes.push(
    {
      id: faker.string.uuid(),
      name: 'Full Scan',
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: 'Quick Scan',
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    },
  );

  // Scans Generation Example (not production-ready)
  for (let i = 0; i < hosts.length; i++) {
    if (Math.random() > 0.5) {
      // Simulate a 50% chance of a scan
      const scan = {
        id: faker.string.uuid(),
        hostId: hosts[i].id ?? hosts[0].id,
        status: faker.helpers.arrayElement([
          'Complete',
          'Failed',
          'In Progress',
        ]),
        scanTypeId: scanTypes[Math.floor(Math.random() * scanTypes.length)].id, // Choose random scan type
        createdAt: faker.date.recent(),
      };
      scans.push(scan);
    }
  }

  //Vulneravilities Generation Example (not production-ready)
  for (let i = 0; i < scans.length; i++) {
    if (Math.random() > 0.8) {
      // Simulate a 20% chance of vulnerabilities in a scan
      const numVulnerabilities = Math.floor(Math.random() * 3) + 1; // Simulate 1-3 vulnerabilities
      for (let j = 0; j < numVulnerabilities; j++) {
        const vulnerability = {
          id: faker.string.uuid(),
          hostId: hosts[i].id ?? hosts[0].id,
          type: faker.helpers.arrayElement([
            'Malware',
            'Ransomware',
            'Spyware',
          ]),
          scanId: scans[i].id,
          severity: faker.helpers.arrayElement([
            'Low',
            'Medium',
            'High',
            'Critical',
          ]),
          description: faker.lorem.sentence(),
        };
        vulnerabilities.push(vulnerability);
      }
    }
  }
  //   if  are empty create 1
  if (vulnerabilities.length === 0) {
    const vulnerability = {
      id: faker.string.uuid(),
      hostId: hosts[0].id,
      type: 'No Vulnerabilities',
      scanId: scans[0].id,
      severity: 'Low',
      description: 'No vulnerabilities found',
    };
    vulnerabilities.push(vulnerability);
  }

  // Logs Generation Example (not production-ready)

  for (let i = 0; i < numLogs; i++) {
    const log = {
      id: faker.string.uuid(),
      hostId: hosts[i]?.id ?? hosts[0].id,
      log: faker.lorem.sentence(), // Generate random log message
      createdAt: faker.date.recent(),
    };
    logs.push(log);
  }

  // Antivirus Table Generation

  // Sample antivirus software names
  const antivirusNames = ['Antivirus Pro', 'Secure Defender', 'Virus Shield'];

  for (let i = 0; i < hosts.length; i++) {
    const isAntivirusInstalled = Math.random() > 0.2; // Simulate 80% chance of antivirus installation

    if (isAntivirusInstalled) {
      const antivirusEntry = {
        id: faker.string.uuid(),
        hostId: hosts[i].id ?? hosts[0].id,
        name: faker.helpers.arrayElement(antivirusNames),
        dbVersion: 'v' + faker.number.int(),
        status: faker.helpers.arrayElement(['Active', 'Inactive']),
        lastUpdate: faker.date.recent(),
      };
      antivirus.push(antivirusEntry);
    }
  }

  // Insert data into database
  console.log('Going to users', users);
  await db.insert(schema.users).values(users);
  console.log('Users seeded');
  console.log('Going to organizations', organizations);
  await db.insert(schema.organizations).values(organizations);
  console.log('Organizations seeded');
  console.log('Going to  organizationUser', organizationUser);
  await db.insert(schema.organizationUser).values(organizationUser);
  console.log('OrganizationUser seeded');
  console.log('Going to  campuses', campuses);
  await db.insert(schema.campuses).values(campuses);
  console.log('Campuses seeded');
  console.log('Going to  buildings', buildings);
  await db.insert(schema.buildings).values(buildings);
  console.log('Buildings seeded');
  console.log('Going to  rooms', rooms);
  await db.insert(schema.rooms).values(rooms);
  console.log('Rooms seeded');
  console.log('Going to  hosts', hosts);
  await db.insert(schema.hosts).values(hosts);
  console.log('Hosts seeded');
  console.log('Going to  scanTypes', scanTypes);
  await db.insert(schema.scanTypes).values(scanTypes);
  console.log('ScanTypes seeded');
  console.log('Going to  scans', scans);
  await db.insert(schema.scans).values(scans);
  console.log('Scans seeded');
  console.log('Going to  vulnerabilities', vulnerabilities);
  await db.insert(schema.vulnerabilities).values(vulnerabilities);
  console.log('Vulnerabilities seeded');
  console.log('Going to logs', logs);
  await db.insert(schema.logs).values(logs);
  console.log('Logs seeded');
  console.log('Going to antivirus', antivirus);
  await db.insert(schema.antivirus).values(antivirus);
  console.log('Antivirus seeded');
}

main();
