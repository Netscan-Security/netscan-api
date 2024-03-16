import { IsUUID } from 'class-validator';

export class FindOneParams {
  @IsUUID()
  /**
   * The room id of the host, must be uuid of a valid room
   * @example 'room1'
   */
  id: string;
}
