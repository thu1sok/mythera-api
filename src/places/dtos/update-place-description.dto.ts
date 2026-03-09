import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePlaceDescriptionDto {
  @IsString()
  @IsNotEmpty()
  descriptionHtml: string;
}