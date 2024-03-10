import bcrypt from 'bcrypt';
const saltRounds = 10;

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
