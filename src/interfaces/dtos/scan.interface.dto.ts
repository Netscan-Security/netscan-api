import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateScanDto {
  @IsUUID()
  /**
   * The id of the scan, must be uuid of a valid scan
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   * @default 'uuid_generate_v4()'
   */
  id: string;

  @IsUUID()
  /**
   * The host id of the scan, must be uuid of a valid host
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  hostId: string;

  @IsNotEmpty()
  @IsString()
  /**
   * The status of the scan
   * @example 'completed'
   */
  status: string;

  @IsUUID()
  /**
   * The scan type id, must be uuid of a valid scan type
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  scanType: string;
}
