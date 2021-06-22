import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuModel } from './menu.model';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
    imports: [SequelizeModule.forFeature([MenuModel])],
    exports: [SequelizeModule],
    providers: [MenuService],
    controllers: [MenuController],
})
export class MenuModule {}
