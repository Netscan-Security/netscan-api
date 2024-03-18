import {
  IsUUID,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class Log {
  @IsUUID()
  /**
   * The id of the log, must be uuid of a valid log
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   * @default 'uuid_generate_v4()'
   */
  id: string;

  @IsUUID()
  /**
   * The host id of the log, must be uuid of a valid host
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  hostId: string;

  @IsNotEmpty()
  @IsObject()
  /**
   * The log data
   * @example { "message": "Application started" }
   */
  log: object;

  @IsNotEmpty()
  /**
   * The creation date of the log
   * @example '2021-01-01T00:00:00Z'
   * @default 'now()'
   */
  createdAt: Date;

  @IsNotEmpty()
  /**
   * The update date of the log
   * @example '2021-01-01T00:00:00Z'
   * @default 'now()'
   */
  updatedAt: Date;
}

export class CreateLogDto {
  //@IsUUID()
  /**
   * The host id of the log, must be uuid of a valid host
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  hostId: string;

  //@IsNotEmpty()
  //@IsObject()
  /**
   * The log data
   * @example @default{ "message": "Application started" }
   */
  log: object;
}

export class UpdateLogDto {
  @IsOptional()
  @IsUUID()
  /**
   * The host id of the log, must be uuid of a valid host
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  hostId?: string;

  @IsOptional()
  @IsString()
  /**
   * The type of the log
   * @example 'error'
   */
  type?: string;

  @IsOptional()
  @IsObject()
  /**
   * The content of the log
   * @example { message: 'An error occurred', code: 500 }
   */
  content?: object;
}
