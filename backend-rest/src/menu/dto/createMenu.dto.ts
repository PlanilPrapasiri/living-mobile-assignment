import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlpha, Length, IsNumber } from 'class-validator';

export class CreateMenuDto {
    @ApiProperty()
    categoryId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

}