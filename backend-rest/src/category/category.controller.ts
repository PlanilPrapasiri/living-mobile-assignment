import { Body, Controller, Get, Post,Put,Delete ,Param} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CategoryDto } from './dto/category.dto';


@Controller('category')
export class CategoryController {
    constructor(private readonly CategoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create Category' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The user has been successfully created.',
        type: CategoryDto,
    })
    async create(@Body() createUserDto: CreateCategoryDto) {
        const user = await this.CategoryService.create(createUserDto);
        // this will map User model value to UserDto model value.
        return plainToClass(CategoryDto, user, { excludeExtraneousValues: true });
    }


    @Get()
    @ApiOperation({ summary: 'Find all Category' })
    @ApiOkResponse({ // HTTP 200
        description: 'All of Category',
        isArray: true,
        type: CategoryDto,
    })
    async findAll() {
        const users = await this.CategoryService.findAll();
        return users.map((user) =>
            plainToClass(CategoryDto, user, { excludeExtraneousValues: true }),
        );
    }
    @Get('/find/:id')
     @ApiOperation({ summary: 'Find one of Category' })
     @ApiOkResponse({
         description: 'Find of Category',
         isArray: true,
         type: CategoryDto,
      })
      async Find(@Param('id') id : string) {
         return this.CategoryService.find(id);
     }

     @Put(':id')
     @ApiOperation({ summary: 'Update of Category' })
     @ApiOkResponse({
         description: 'Update of Category',
      })
      async Update(@Param('id') id: string, @Body() store: CreateCategoryDto ){
         return this.CategoryService.Update(id,store);
         // return this.storeService.findAll();
     }

     @Delete(':id')
     @ApiOperation({ summary: 'delete of Category' })
     @ApiOkResponse({
         description: 'Delete of Category',
      })
      async Delete(@Param('id') id : string) {
         return this.CategoryService.Delete(id);
     }
}
