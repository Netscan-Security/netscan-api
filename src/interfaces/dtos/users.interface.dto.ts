import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../tables/users.interface';

export class LoginUserDto {
  /**
   * The email of the user
   * @example  'example@ap.com'
   */
  @IsEmail()
  email: string;
  /**
   * The password of the user
   * @example 'password'
   */
  @IsNotEmpty()
  password: string;
}

export class AddUserDto {
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
   * @example  'example@example.app'
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
   * @example 'user'
   * @default 'user'
   */
  role: string;
  /**
   * The has host of the user
   * @example false
   */
  hasHost: boolean;
  /**
   * The created at date of the user
   * @example '2021-01-01T00:00:00Z'
   */
  createdAt: Date;
  /**
   * The updated at date of the user
   * @example '2021-01-01T00:00:00Z'
   */
  updatedAt: Date;
}

export class CreateAdminDto
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
   * @example  'example@example.app'
   */
  @IsEmail()
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
  @IsNotEmpty()
  password: string;
  /**
   * The image url of the user
   * @example 'http://example.com/image.jpg'
   */
  imageUrl: string;
  /**
   * The role of the user
   * @example 'admin'
   * @default 'admin'
   */
  role: 'admin' | 'user' | 'superAdmin';
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
