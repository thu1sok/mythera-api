import { IsString, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class UpdateCharacterDto {
    @IsString()
    @IsOptional()
    characterName?: string;

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

    @IsArray()
    @IsOptional()
    characterClasses?: { name: string, level: number }[];

    @IsOptional()
    isDead?: boolean;
}

