import { IsString, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class UpdateCharacterDto {
    @IsString()
    @IsOptional()
    playerName?: string;

    @IsMongoId()
    @IsOptional()
    subraceId?: string;

    @IsMongoId()
    @IsOptional()
    currentPlaceId?: string;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    deitiesIds?: string[];

    @IsString()
    @IsOptional()
    backstory?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    eventsAndAchievements?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    plotItems?: string[];
}

