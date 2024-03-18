import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Host } from '../tables/hosts.interface';

export class CreateHostDto
  implements
    Omit<
      Host,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'status'
      | 'onboardingStage'
      | 'vpnConfig'
    >
{
  /**
   * A name for the host
   * @example 'Host1'
   */
  name: string;
  /**
   * The user id of the host, must be uuid of a valid user
   * @example 'user1'
   */
  @IsUUID()
  userId: string;
  /**
   * The room id of the host, must be uuid of a valid room
   * @example 'room1'
   */
  @IsUUID()
  roomId: string;
  /**
   * The cpu of the host
   * @example 'Intel Core i7'
   */
  @IsUUID()
  /**
   * The admin id of the host, must be uuid of a valid user
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  adminId: string;

  @IsOptional()
  cpu: string;
  /**
   * The memory of the host
   * @example '16GB'
   */
  @IsOptional()
  memory: string;
  /**
   * The gpu of the host
   * @example 'Nvidia GTX 1060'
   */
  @IsOptional()
  gpu: string;
  /**
   * The hard disk of the host
   * @example '1TB'
   */
  @IsOptional()
  hardDisk: string;
  /**
   * Raw information of the host
   * @example { cpu: 'Intel Core i7', memory: '16GB', gpu: 'Nvidia GTX 1060', hardDisk: '1TB', os: 'Windows 10', model: 'Dell', ipAddress: '23.233.3232.' }
   */
  @IsOptional()
  rawInfo: object;
  /**
   * The os of the host
   * @example 'Windows 10'
   */
  @IsOptional()
  os: string;
  /**
   * The model of the host
   * @example 'Dell'
   */
  @IsOptional()
  model: string;
  /**
   * The ip address of the host
   * @example '23.233.3232.'
   */
  @IsOptional()
  ipAddress: string;
}

export class UpdateHostDto {
  @IsString()
  @IsOptional()
  /**
   * A name for the host
   * @example 'Updated Host1'
   */
  name?: string;

  @IsOptional()
  @IsUUID()
  /**
   * The user id of the host, must be uuid of a valid user
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  userId?: string;

  @IsUUID()
  @IsOptional()
  /**
   * The room id of the host, must be uuid of a valid room
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  roomId?: string;

  @IsOptional()
  @IsString()
  /**
   * The cpu of the host
   * @example 'Updated Intel Core i7'
   */
  cpu?: string;

  @IsOptional()
  status?: 'online' | 'offline';

  @IsOptional()
  @IsString()
  /**
   * The memory of the host
   * @example 'Updated 16GB'
   */
  memory?: string;
}
