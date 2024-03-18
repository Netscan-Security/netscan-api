import { Inject, Injectable, Logger } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import {
  CreateHostDto,
  UpdateHostDto,
} from 'src/interfaces/dtos/hosts.interface.dto';
import { eq } from 'drizzle-orm';

import { HttpService } from '@nestjs/axios';

import { catchError } from 'rxjs/operators';

@Injectable()
export class HostService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  private readonly logger = new Logger(HostService.name);
  private readonly httpService = new HttpService();
  async findAll() {
    return await this.db.query.hosts.findMany({});
  }

  async performScan(hostId: string): Promise<any> {
    const host = await this.findById(hostId);
    if (!host) {
      throw new Error('Host not found');
    }

    return this.httpService
      .get(`${host.ipAddress}/make-scan`)
      .pipe(
        catchError(async (error) => {
          // If there is any error, update status of host to be offline
          await this.update(hostId, { status: 'offline' });
          throw error;
        }),
      )
      .toPromise()
      .then(async () => {
        // If success, update status to be online
        await this.update(hostId, { status: 'online' });
        return { message: 'Scan performed successfully' };
      });
  }

  async create(data: CreateHostDto) {
    const result = await this.db
      .insert(schema.hosts)
      .values(data)
      .returning()
      .execute();

    return result[0];
  }

  async findById(id: string) {
    return this.db.query.hosts.findFirst({
      where: eq(schema.hosts.id, id),
    });
  }

  async findByAdminId(adminId: string): Promise<any> {
    const result = await this.db.query.hosts.findMany({
      where: eq(schema.hosts.adminId, adminId),
    });
    Logger.debug('Host Service', 'Found Host by Admin ID: ', result);
    return result[0];
  }

  async findByUserId(userId: string): Promise<any> {
    const result = await this.db.query.hosts.findMany({
      where: eq(schema.hosts.userId, userId),
    });

    Logger.debug('Host Service', 'Found Host by User ID: ', result);
    return result[0];
  }

  async update(id: string, updateHostDto: UpdateHostDto): Promise<any> {
    const result = await this.db
      .update(schema.hosts)
      .set(updateHostDto)
      .where(eq(schema.hosts.id, id))
      .returning()
      .execute();

    this.logger.debug('Host Service', 'Updated Host: ', result);
    return result[0];
  }

  async remove(id: string): Promise<any> {
    const result = await this.db
      .delete(schema.hosts)
      .where(eq(schema.hosts.id, id))
      .returning()
      .execute();

    this.logger.debug('Host Service', 'Deleted Host: ', result);
    return result[0];
  }
}
