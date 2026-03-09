import { IsString, IsOptional } from 'class-validator';

export class UpdatePlaceCreaturesDto {
  @IsOptional()
  @IsString()
  creatures?: string;

  @IsOptional()
  @IsString()
  legendaryCreatures?: string;
}