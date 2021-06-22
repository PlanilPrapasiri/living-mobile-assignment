import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [SequelizeModule.forFeature([CategoryModel])],
    exports: [SequelizeModule],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}
