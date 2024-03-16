import { Logger } from '@nestjs/common';

// clean password from user object
export const cleanPassword = (user: any) => {
  delete user.password;
  Logger.debug('Password cleaned');
  return user;
};
