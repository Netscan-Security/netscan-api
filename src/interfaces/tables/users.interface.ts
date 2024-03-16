export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contactNumber: string;
  password: string;
  imageUrl: string;
  role: 'admin' | 'user' | 'superAdmin';
  hasHost: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserResponse {
  user: User extends { password: string } ? Omit<User, 'password'> : User;
  access_token: string;
}
