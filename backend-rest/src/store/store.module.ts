import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModel } from './store.model';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';

@Module({
    imports: [SequelizeModule.forFeature([StoreModel])],
    exports: [SequelizeModule],
    providers: [StoreService],
    controllers: [StoreController],
})
export class StoreModule {}
