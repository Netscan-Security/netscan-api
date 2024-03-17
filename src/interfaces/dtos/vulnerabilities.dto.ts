import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateVulnerabilityDto {
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

export class UpdateVulnerabilityDto {
  @IsOptional()
  @IsString()
  /**
   * The type of the vulnerability
   * @example 'XSS'
   */
  type?: string;

  @IsOptional()
  @IsString()
  /**
   * The severity of the vulnerability
   * @example 'High'
   */
  severity?: string;

  @IsOptional()
  @IsString()
  /**
   * The description of the vulnerability
   * @example 'Cross-site scripting vulnerability'
   */
  description?: string;
}
