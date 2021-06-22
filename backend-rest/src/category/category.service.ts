import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel) // inject model and use it as repository
    private categoryRepo: typeof CategoryModel, // UserModel act like userRepo here.
  ) {}

  create(category: CreateCategoryDto) {
      // userRepo is Sequelize model it have many functions to work with database.
      // more info please see below documents.
      return this.categoryRepo.create(category);
  }

  findAll() {
      return this.categoryRepo.findAll();
  }
  async find(id:string) : Promise<CategoryModel>{
    return this.categoryRepo.findOne({
        where :{id :id}
    });
  }

    async Update(id:string,category: CreateCategoryDto): Promise<void>{
        await this.categoryRepo.update(category,{
        where: {id:id}
        });
    }

  async Delete(id:string): Promise<void>{
    await this.categoryRepo.destroy({
      where: {id:id}
    });
  }
}
