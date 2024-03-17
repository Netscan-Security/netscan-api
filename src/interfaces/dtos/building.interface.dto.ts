import { IsNotEmpty, IsString, IsObject, IsUUID } from 'class-validator';

export class CreateBuildingDto {
  @IsNotEmpty()
  @IsString()
  /**
   * The name of the building
   * @example 'Building 1'
   */
  name: string;

  @IsNotEmpty()
  @IsObject()
  /**
   * The metadata of the building
   * @example { "floors": 5, "rooms": 20 }
   */
  metadata: object;

  @IsUUID()
  /**
   * The campus id of the building, must be uuid of a valid campus
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  campusId: string;
}
