/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './schemas/product.schema';
import { Review } from './schemas/review.schema';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<ProductsDocument>;

  const mockProduct = {
    _id: 'someid',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    quantity: 10,
    category: 'TestCategory',
    brand: 'TestBrand',
    reviews: [],
    save: jest.fn().mockResolvedValue(this),
  };

  const mockProductModel = {
    create: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    findById: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getModelToken(Products.name), useValue: mockProductModel },
        { provide: getModelToken(Review.name), useValue: mockProductModel },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<ProductsDocument>>(
      getModelToken(Products.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
