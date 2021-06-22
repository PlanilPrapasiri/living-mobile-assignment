import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StoreModel } from './store.model';
import { CreateStoreDto } from './dto/createStore.dto';
import { where } from 'sequelize';
import { StoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(StoreModel) // inject model and use it as repository
        private storeRepo: typeof StoreModel, // UserModel act like userRepo here.
      ) {}
    
      create(user: CreateStoreDto) {
          return this.storeRepo.create(user);
      }
    
      findAll() {
          return this.storeRepo.findAll();
      }

      async find(id:string) : Promise<StoreModel>{
            return this.storeRepo.findOne({
                where :{id :id}
            });
      }

      async Update(id:string,store: CreateStoreDto): Promise<void>{
        await this.storeRepo.update(store,{
          where: {id:id}
        });
      }

      async Delete(id:string): Promise<void>{
          await this.storeRepo.destroy({
            where: {id:id}
          });
      }
       
    
}
