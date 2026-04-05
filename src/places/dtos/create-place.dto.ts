import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlaceDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  x: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  y: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  iconSize?: string;
  
  @IsOptional()
  details?: any;
}
