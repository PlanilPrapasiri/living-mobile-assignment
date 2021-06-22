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
describe('StoresController (e2e)', () => {
    let app: INestApplication;
    let service: StoreService;
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
            ],
            providers: [StoreService],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        service = module.get<StoreService>(StoreService);
    });

    describe('Find all store', () => {
        it('When there is one user, then return that store', async () => {
            const createStoresInput = {
                name: 'AAAAA',
                description: 'Aaaaaa',
                rating: 3,
            };
            await service.create(createStoresInput);
            return request(app.getHttpServer())
                .get('/store/all')
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                });
        });
    });
    describe('Create stores', () => {
        it('When store with valid input, then response 201 (OK) with created stores', async () => {
            const createStoreInput = {
                name: 'John',
                description: 'Doe',
                rating: 3,
            };
            return request(app.getHttpServer())
                .post('/store')
                .send(createStoreInput)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining(createStoreInput),
                        );
                    });
        });
    });
    describe('Update stores', () => {
        it('When store with valid input, then response 200 (OK) with update stores', async () => {
            const updateStoreInput = {
                name: 'John',
                description: 'Doee',
                rating: 3,
            };
            return request(app.getHttpServer())
                .put('/store/{id}')
                .send(updateStoreInput)
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                    });
        });
        it('When update invalid , then response 400 (Bad Request)', async () => {
            const createStoreInput = { name : '', description: '' ,rating :'test' };
            return request(app.getHttpServer())
                .put('/store/{id}')
                .send(createStoreInput) 
                .expect(400);
        });
    });

    describe('Delete stores', () => {
        it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
            // arrange
            const DeleteID = {
                id: '297e3e67-baf0-4763-ac0e-d150fdb0cd43'
            };
            return request(app.getHttpServer())
                .delete('/store/{id}')
                .send(DeleteID)
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