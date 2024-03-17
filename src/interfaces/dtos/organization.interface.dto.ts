import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  /**
   * The name of the organization
   * @example 'My Organization'
   */
  name: string;

  @IsString()
  /**
   * The description of the organization
   * @example 'This is my organization'
   */
  description: string;

  @IsString()
  /**
   * The image URL of the organization
   * @example 'http://example.com/my-image.jpg'
   */
  imageUrl: string;

  @IsUUID()
  /**
   * The user ID of the owner of the organization, must be uuid of a valid user
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  ownedBy: string;
}

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  /**
   * The name of the organization
   * @example 'My Updated Organization'
   */
  name?: string;

  @IsOptional()
  @IsString()
  /**
   * The description of the organization
   * @example 'This is my updated organization'
   */
  description?: string;

  @IsOptional()
  @IsString()
  /**
   * The image URL of the organization
   * @example 'http://example.com/my-updated-image.jpg'
   */
  imageUrl?: string;

  @IsOptional()
  @IsUUID()
  /**
   * The user ID of the owner of the organization, must be uuid of a valid user
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  ownedBy?: string;
}
