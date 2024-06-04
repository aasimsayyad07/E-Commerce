/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductsController } from './products.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import exp from 'constants';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductService = {
    addProduct: jest.fn(),
    getProducts: jest.fn(),
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should add new Product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Smartphone',
      description: 'Latest smartphone',
      price: 200,
      quantity: 200,
      category: 'Electronics',
      brand: 'Brand B',
    };

    const expectedResult = { createProductDto };
    mockProductService.addProduct.mockResolvedValue(expectedResult);

    const result = await controller.addProduct(createProductDto);
    expect(service.addProduct).toHaveBeenCalledWith(createProductDto);
    expect(result).toBe(expectedResult);
  });

  it('should search product', async () => {
    const expectedResult = {
      id: 'fdsfdfsfsdf',
      name: 'Smartphone',
      description: 'Latest smartphone',
      price: 200,
      quantity: 200,
      category: 'Electronics',
      brand: 'Brand B',
    };

    mockProductService.search.mockResolvedValue(expectedResult);
    const query = { name: 'Smartphone' };

    const result = await controller.search(query);
    expect(result).toBe(expectedResult);
  });

  it('should get all products', async () => {
    const expectedResult = [
      {
        id: 'fdsfdfsfsdf',
        name: 'Smartphone',
        description: 'Latest smartphone',
        price: 200,
        quantity: 200,
        category: 'Electronics',
        brand: 'Brand B',
      },
      {
        id: '1234567ughjgfds',
        name: 'Washing Machine',
        description: 'Latest smartphone',
        price: 200,
        quantity: 200,
        category: 'Electronics',
        brand: 'Brand B',
      },
      {
        id: '344r3esadsfds',
        name: 'T-Shrit',
        description: 'Latest Wear',
        price: 200,
        quantity: 20,
        category: 'Cloting',
        brand: 'Brand C',
      },
    ];

    mockProductService.getProducts.mockResolvedValue(expectedResult);
    const result = await controller.getProducts();
    expect(result).toBe(expectedResult);
  });
});
