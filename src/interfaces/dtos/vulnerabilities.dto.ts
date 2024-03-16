import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateVulnerabilityDto {
  @IsUUID()
  /**
   * The id of the vulnerability, must be uuid of a valid vulnerability
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   * @default 'uuid_generate_v4()'
   */
  id: string;

  @IsNotEmpty()
  @IsString()
  /**
   * The host id of the vulnerability
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  hostId: string;

  @IsNotEmpty()
  @IsString()
  /**
   * The type of the vulnerability
   * @example 'XSS'
   */
  type: string;

  @IsNotEmpty()
  @IsString()
  /**
   * The severity of the vulnerability
   * @example 'High'
   */
  severity: string;

  @IsOptional()
  @IsString()
  /**
   * The description of the vulnerability
   * @example 'Cross-site scripting vulnerability'
   */
  description: string;
}
