import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateScanDto {
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

export class UpdateScanDto {
  @IsOptional()
  @IsString()
  /**
   * The status of the scan
   * @example 'completed'
   */
  status?: string;

  @IsOptional()
  @IsUUID()
  /**
   * The scan type id, must be uuid of a valid scan type
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  scanType?: string;
}
