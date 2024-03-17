import { IsUUID, IsNotEmpty, IsString, IsObject } from 'class-validator';

export class CreateCampusDto {
  @IsNotEmpty()
  @IsString()
  /**
   * @description Campus name
   * @example 'Campus 1'
   */
  name: string;

  @IsNotEmpty()
  @IsObject()
  /*
   * @description Campus metadata
   * @example {}
   */
  metadata: object;

  @IsUUID()
  /*
   * @description Organization id
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  organizationId: string;
}
