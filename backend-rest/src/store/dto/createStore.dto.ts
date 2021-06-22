import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlpha, Length, IsNumber } from 'class-validator';

export class CreateStoreDto {
    @ApiProperty()
    @IsString()
    @IsAlpha()
    @Length(3, 50)
    name: string;

    @ApiProperty()
    @IsString()
    @IsAlpha()
    @Length(3, 50)
    description: string;

    @ApiProperty()
    @IsNumber()
    rating: number;
}