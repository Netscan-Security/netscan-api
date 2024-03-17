import { IsNotEmpty, IsString, IsObject, IsUUID } from 'class-validator';

export class CreateBuildingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  metadata: object;

  @IsUUID()
  campusId: string;
}
