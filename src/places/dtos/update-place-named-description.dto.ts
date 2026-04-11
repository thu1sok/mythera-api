import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AddNamedDescriptionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateNamedDescriptionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}