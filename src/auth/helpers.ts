import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(password: string) {
  try {
    Logger.debug('Hashing password');
    const hash: any = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    Logger.error('Error hashing password', error);
    throw error;
  }
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
