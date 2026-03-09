import { IsString, IsNotEmpty } from 'class-validator';

export class AddNamedDescriptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}