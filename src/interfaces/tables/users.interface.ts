export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contactNumber: string;
  password: string;
  imageUrl: string;
  role: Roles;
  hasHost: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// export class Roles
// { enum: ['admin', 'user', 'superAdmin'] }
export enum Roles {
  Admin = 'admin',
  User = 'user',
  SuperAdmin = 'superAdmin',
}

export class UserResponse {
  user: User extends { password: string } ? Omit<User, 'password'> : User;
  access_token: string;
}
