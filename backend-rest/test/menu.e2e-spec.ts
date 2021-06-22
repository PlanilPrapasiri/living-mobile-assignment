import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoreModule } from '../src/store/store.module';
import { MenuService } from '../src/menu/menu.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from '../src/category/category.module'
import { MenuModule } from '../src/menu/menu.module';
import { CategoryService } from '../src/category/category.service';
import { StoreService } from '../src/store/store.service';
describe('MenusController (e2e)', () => {
    let app: INestApplication;
    let service: MenuService;
    let categoryService : CategoryService
    let storeService : StoreService
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                StoreModule,
                CategoryModule,
                MenuModule
            ],
            providers: [MenuService],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        service = module.get<MenuService>(MenuService);
        categoryService = module.get<CategoryService>(CategoryService);
        storeService = module.get<StoreService>(StoreService);
    });
    describe('Find all munu', () => {
        it('When there is one user, then return that store', async () => {
            return request(app.getHttpServer())
                .get('/menu')
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                });
        });
    });
    describe('Create menus', () => {
        it('When store with valid input, then response 200 (OK) with created stores', async () => {
                //CreateStore
                const StoreInsert = {
                    name: 'neeen',
                    description: 'neentest',
                    rating: 5,
                };
                const txtStore = await storeService.create(StoreInsert);
                 //CreateCategory   
                const CreateCategory1 = {
                    name : 'neencat',
                    storeId : txtStore.id
                }
                const txtCet = await categoryService.create(CreateCategory1)
                const CreateMenu = {
                    name: 'cccc',
                    price : 150,
                    categoryId: txtCet.id
                };
                await service.create(CreateMenu)
                await request(app.getHttpServer())
                .post('/menu')
                .send(CreateMenu)
                .set ('Content-type','application/json')
                .then((response) => {
                    expect(response.statusCode).toEqual(201);
                    });
            });
        });
        describe('Update Menus', () => {
            it('When menu with valid input, then response 200 (OK) with update menus', async () => {
                 //CreateStore
                 const StoreInsert = {
                    name: 'neeen',
                    description: 'neentest',
                    rating: 5,
                };
                const txtStore = await storeService.create(StoreInsert);
                 //CreateCategory   
                const CreateCategory1 = {
                    name : 'neencat',
                    storeId : txtStore.id
                }
                const txtCet = await categoryService.create(CreateCategory1)
                const CreateMenu = {
                    name: 'cccc',
                    price : 150,
                    categoryId: txtCet.id
                };
                await service.create(CreateMenu)
                return request(app.getHttpServer())
                    .put('/menu/{id}')
                    .send(CreateMenu)
                    .expect(200)
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        });
                });
        });
        describe('Delete stores', () => {
            it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
                 //CreateStore
                 const StoreInsert = {
                    name: 'neeen',
                    description: 'neentest',
                    rating: 5,
                };
                const txtStore = await storeService.create(StoreInsert);
                 //CreateCategory   
                const CreateCategory1 = {
                    name : 'neencat',
                    storeId : txtStore.id
                }
                const txtCet = await categoryService.create(CreateCategory1)
                const CreateMenu = {
                    name: 'cccc',
                    price : 150,
                    categoryId: txtCet.id
                };
                await service.create(CreateMenu)
                return request(app.getHttpServer())
                        .delete('/menu/{id}')
                        .send(CreateMenu)
                        .expect(200)
                        .then((response) => {
                            expect(response.statusCode).toEqual(200);
                            });
                    });
        });
        afterAll(async () => {
        await app.close();
        });
});