import { col } from 'sequelize';
import { Column, Model, Table ,DataType ,ForeignKey} from 'sequelize-typescript';
import { CategoryModel } from '../category/category.model';

@Table({
    tableName: 'menu',
})
export class MenuModel extends Model {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
    })
    id: string;

    @Column({
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    @ForeignKey(()=> CategoryModel)
    categoryId: string

    @Column
    name: string

    @Column
    price: number
}