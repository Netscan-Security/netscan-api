import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { CreateScanDto } from 'src/interfaces/dtos/scan.interface.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class ScanService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(data: CreateScanDto): Promise<any> {
    const isScanTypeValid = await this.findScanTypeById(data.scanType);
    if (!isScanTypeValid) {
      throw new Error('Invalid Scan Type');
    }

    const result = await this.db
      .insert(schema.scans)
      .values(data)
      .returning()
      .execute();

    return result[0];
  }

  async findById(id: string) {
    return this.db.query.scans.findFirst({
      where: eq(schema.scans.id, id),
    });
  }

  async findScanTypeById(id: string) {
    return this.db.query.scans.findFirst({
      where: eq(schema.scans.scanType, id),
    });
  }

  async findAll() {
    return this.db.query.scans.findMany({});
  }
}
