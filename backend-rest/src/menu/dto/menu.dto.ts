import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MenuDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    categoryId: string;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    price: number;
}
