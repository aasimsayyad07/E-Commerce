/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { IPattern } from './interfaces/search-product.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';
import * as CircuitBreaker from 'opossum';
import axios from 'axios';

@Injectable()
export class ProductsService {
  private circuitBreaker;
  private token: any;
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {
    const protectedFunction = async () => {
      return await this.callExternalService();
    };

    this.circuitBreaker = new CircuitBreaker(protectedFunction, {
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 15000,
    });

    this.circuitBreaker.on('open', () => console.log('Circuit breaker opened'));
    this.circuitBreaker.on('halfOpen', () =>
      console.log('Circuit breaker half-open'),
    );
    this.circuitBreaker.on('close', () =>
      console.log('Circuit breaker closed'),
    );
  }

  /**
   * @function addProduct
   * @description Route handle for adding new product in Product Database
   * @param createProductDto
   * @returns Newly added product Information
   */
  async addProduct(createProductDto: CreateProductDto): Promise<Products> {
    try {
      const createProduct = new this.productModel(createProductDto);
      return createProduct.save();
    } catch (err) {
      return err;
    }
  }

  /**
   * @function getProducts
   * @returns all product information from database
   */
  async getProducts() {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (err) {
      return err;
    }
  }

  /**
   * @function search
   * @description search product using name, id, brand, category
   * @param query which is coming from client
   * @returns particular product
   */
  async search(query: IPattern) {
    try {
      const pattern: IPattern = {};

      if (query.id) {
        pattern.id = query.id;
      }

      if (query.name) {
        pattern.name = { $regex: new RegExp(query.name, 'i') };
      }

      if (query.brand) {
        pattern.brand = { $regex: new RegExp(query.brand, 'i') };
      }

      if (query.category) {
        pattern.category = { $regex: new RegExp(query.category, 'i') };
      }

      const products = await this.productModel.find(pattern);

      if (products.length === 0) {
        return { error: 'Product not found' };
      }
      return products;
    } catch (err) {
      return err;
    }
  }

  /**
   * @function addReview
   * @description add new review for particular product
   * @param param as name of Product
   * @param createReviewDto
   * @returns Product with newly added review
   */
  async addReview(param: string, createReviewDto: CreateReviewDto) {
    try {
      const product = await this.productModel.findOne({ name: param });

      if (!product) {
        return { error: 'Product not found' };
      }

      const newReview = new this.reviewModel(createReviewDto);
      product.reviews.push(newReview);

      await product.save();

      return product;
    } catch (err) {
      return err;
    }
  }

  /**
   * @function updateQuantity
   * @description Update qunatity of product after user pursed product
   * @param id
   * @param qunatity
   * @returns successful message
   */
  async updateQuantity(id: string, qunatity: number) {
    const product = await this.productModel.findOne({ id: id });

    if (!product) {
      return new BadRequestException('Product is not found');
    }

    product.quantity = product.quantity - qunatity;
    await product.save();
    return { message: 'Qunatity Updated Succesfully' };
  }

  //function for adding Timestamp after updating products
  async addTimestamp(id: string, date: string) {
    return date;
  }

  /*Check Our Application should handle one service in a microservices 
  architecture is down and prevent the second service from failing or endlessly waiting*/
  /************************* Circuit Breaker *******************************************/

  async executeProtectedFunction(token: any) {
    this.token = token;
    return this.circuitBreaker.fire();
  }
  async callExternalService() {
    try {
      const response = await axios.get(
        'http://localhost:8000/orders/getAllOrders',
        { headers: { Authorization: this.token } },
      );
      return response.data;
    } catch (error) {
      throw new Error('External service is unavailable');
    }
  }
}
