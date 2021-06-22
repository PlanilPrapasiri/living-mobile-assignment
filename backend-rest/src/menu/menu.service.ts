import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuModel } from './menu.model';
import { CreateMenuDto } from './dto/createMenu.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(MenuModel) // inject model and use it as repository
        private MenuRepo: typeof MenuModel, // UserModel act like userRepo here.
      ) {}
    
      create( menu: CreateMenuDto) {
          // userRepo is Sequelize model it have many functions to work with database.
          // more info please see below documents.
          return this.MenuRepo.create(menu);
      }
    
      findAll() {
          return this.MenuRepo.findAll();
      }

      async find(id:string) : Promise<MenuModel>{
        return this.MenuRepo.findOne({
            where :{id :id}
        });
      }
    
        async Update(id:string,category: CreateMenuDto): Promise<void>{
            await this.MenuRepo.update(category,{
            where: {id:id}
            });
        }
    
      async Delete(id:string): Promise<void>{
        await this.MenuRepo.destroy({
          where: {id:id}
        });
      }
}
