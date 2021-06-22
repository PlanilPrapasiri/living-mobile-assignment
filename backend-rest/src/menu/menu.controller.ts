import { Body, Controller, Get, Post ,Put,Delete,Param, UsePipes, ValidationPipe} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MenuDto } from './dto/menu.dto';
import { ApiBadRequestResponse } from '@nestjs/swagger';
@Controller('menu')
export class MenuController {
    constructor(private readonly MenuService: MenuService) {}

    @Post()
    @ApiOperation({ summary: 'Create Menu' })
    @ApiCreatedResponse({
        
        description: 'The user has been successfully created.',
        type: MenuDto,
    })
   
    async create(@Body() CreateMenuDto: CreateMenuDto) {
        const user = await this.MenuService.create(CreateMenuDto);
        return plainToClass(MenuDto, user, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: 'Find all Menu ' })
    @ApiOkResponse({
        description: 'Find All of Menu successfully',
        isArray: true,
        type: MenuDto,
     })
     async findAll() {
        const store = await this.MenuService.findAll();
        return store.map(( Store) =>
            plainToClass(MenuDto, Store, { excludeExtraneousValues: true }),
        );
        // return this.storeService.findAll();
    }

    @Get('/find/:id')
     @ApiOperation({ summary: 'Find one of Menu' })
     @ApiOkResponse({
         description: 'Find of Menu successfully',
         isArray: true,
         type: MenuDto,
      })
      async Find(@Param('id') id : string) {
         return this.MenuService.find(id);
     }

     @Put(':id')
     @ApiOperation({ summary: 'Update of Menu' })
     @ApiOkResponse({
        description: 'Update of Menu successfully',

     })
      async Update(@Param('id') id: string, @Body() store: CreateMenuDto ){
         return this.MenuService.Update(id,store);
         // return this.storeService.findAll();
     }

     @Delete(':id')
     @ApiOperation({ summary: 'delete of Menu' })
     @ApiOkResponse({
        description: 'delete of Menu successfully',
     })
      async Delete(@Param('id') id : string) {
         return this.MenuService.Delete(id);
     }
}
