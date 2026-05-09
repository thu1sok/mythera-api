import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type, Transform, plainToInstance } from 'class-transformer';

export class RegionPointDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

export class CreateRegionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @Transform(({ value }) => value === undefined ? undefined : Number(value))
  @IsNumber()
  fillOpacity?: number;

  @Transform(({ value }) => {
    let parsed = value;
    if (typeof value === 'string') {
      try {
        parsed = JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return Array.isArray(parsed) ? plainToInstance(RegionPointDto, parsed) : parsed;
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegionPointDto)
  points: RegionPointDto[];
}
