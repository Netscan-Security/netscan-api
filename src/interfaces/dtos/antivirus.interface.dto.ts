import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAntiVirusDto {
  @IsNotEmpty()
  @IsString()
  /**
   * The name of the antivirus
   * @example 'Avast'
   * @default 'Avast'
   */
  name: string;

  @IsUUID()
  /**
   * The host id of the antivirus, must be uuid of a valid host
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  hostId: string;

  @IsNotEmpty()
  @IsString()
  /**
   * The database version of the antivirus
   * @example '2021.01.01'
   * @default '2021.01.01'
   */
  dbVersion: string;

  @IsNotEmpty()
  /**
   * The last update of the antivirus
   * @example '2021-01-01T00:00:00Z'
   * @default 'now()'
   */
  lastUpdate: Date;
}

export class UpdateAntiVirusDto {
  @IsOptional()
  @IsString()
  /**
   * The name of the antivirus
   * @example 'Updated Avast'
   */
  name?: string;

  @IsOptional()
  @IsUUID()
  /**
   * The host id of the antivirus, must be uuid of a valid host
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  hostId?: string;

  @IsOptional()
  @IsString()
  /**
   * The database version of the antivirus
   * @example '2022.01.01'
   */
  dbVersion?: string;

  @IsOptional()
  /**
   * The last update of the antivirus
   * @example '2022-01-01T00:00:00Z'
   */
  lastUpdate?: Date;
}
