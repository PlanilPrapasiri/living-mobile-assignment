import { Column, Model, Table ,DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { CategoryModel } from '../category/category.model';

@Table({
    tableName: 'store',
})
export class StoreModel extends Model {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
    })
    id: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    rating: number;

    @HasMany(()=> CategoryModel)
    categoryId : CategoryModel[]

}