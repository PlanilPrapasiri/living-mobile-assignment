import { Body, Controller, Get, Param, Post, Put ,Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { StoreDto } from './dto/store.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({
        
        description: 'The user has been successfully created.',
        type: StoreDto,
    })
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        }),
    )
    async create(@Body() CreateStoreDto: CreateStoreDto) {
        const user = await this.storeService.create(CreateStoreDto);
        // this will map User model value to UserDto model value.
        return plainToClass(StoreDto, user, { excludeExtraneousValues: true });
    }
    

    @Get('/all')
    @ApiOperation({ summary: 'Get All of store' })
    @ApiOkResponse({
        description: 'All of store',
        isArray: true,
        type: StoreDto,
     })
     async findAll() {
        const store = await this.storeService.findAll();
        return store.map(( Store) =>
            plainToClass(StoreDto, Store, { excludeExtraneousValues: true }),
        );
        // return this.storeService.findAll();
    }

    @Get('/find/:id')
    @ApiOperation({ summary: 'Find one of store' })
    @ApiOperation({
        description: 'Find of store',
     })
     async Find(@Param('id') id : string) {
        return this.storeService.find(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update of store' })
    @ApiOperation({
        description: 'Update of store',
     })
     @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        }),
    )
     async Update(@Param('id') id: string, @Body() store: CreateStoreDto ){
        return this.storeService.Update(id,store);
        // return this.storeService.findAll();
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete of store' })
    @ApiOperation({
        description: 'Delete of store',
     })
     async Delete(@Param('id') id : string) {
        return this.storeService.Delete(id);
    }
   
}
