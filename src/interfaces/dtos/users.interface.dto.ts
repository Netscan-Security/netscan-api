import { Roles, User } from '../tables/users.interface';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  /**
   * The first name of the user
   * @example 'John'
   */
  firstName: string;
  /**
   * The last name of the user
   * @example 'Doe'
   */
  lastName: string;
  /**
   * The username of the user
   * This field must be unique
   * @example 'johndoe'
   */
  username: string;
  /**
   * The email of the user
   * This field must be a valid email and unique
   * @example '
   */
  email: string;
  /**
   * The contact number of the user
   * @example '1234567890'
   */
  contactNumber: string;
  /**
   * The user who created the user, it must be a uuid and a valid user id
   * @example '123e4567-e89b-12d3-a456-426614174000'
   * @default null
   */
  createdBy: string;
  /**
   * The password of the user
   * @example 'password'
   */
  password: string;
  /**
   * The image url of the user
   * @example 'http://example.com/image.jpg'
   */
  imageUrl: string;
  /**
   * The role of the user
   * @example 'admin'
   */
  role: Roles;
  /**
   * The has host of the user
   * @example false
   */
  hasHost: boolean;
  /**
   * The created at date of the user
   * @example '2021-01-01T00:00:00Z'
   */
}

export class LoginUserDto {
  /**
   * The username of the user
   * @example 'johndoe'
   */
  username: string;
  /**
   * The password of the user
   * @example 'password'
   */
  password: string;
}
