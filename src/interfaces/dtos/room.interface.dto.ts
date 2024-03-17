import { IsNotEmpty, IsString, IsObject, IsUUID } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  /**
   * The name of the room
   * @example 'Room 101'
   */
  name: string;

  @IsNotEmpty()
  @IsObject()
  /**
   * The metadata of the room
   * @example { "capacity": 50, "type": "lecture" }
   */
  metadata: object;

  @IsUUID()
  /**
   * The building id of the room, must be uuid of a valid building
   * @example 'fd5c008f-a521-49a4-9727-ac44c0deaa58'
   */
  buildingId: string;
}
