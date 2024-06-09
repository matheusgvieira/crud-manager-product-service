import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./schemas/product.schema";
import {
  ProductCreateRequest,
  ProductCreateResponse,
} from "./dtos/product-create.dto";
import {
  ProductListRequest,
  ProductListResponse,
} from "./dtos/product-list.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  async create(
    createProductDto: ProductCreateRequest
  ): Promise<ProductCreateResponse> {
    const product_created = new this.productModel(createProductDto);

    product_created.save();

    const product_response = await this.productModel.findOne({
      _id: product_created._id,
    });

    return {
      product: product_response,
      message: "Product created successfully",
      success: true,
    };
  }

  async getAll(
    productListDto: ProductListRequest
  ): Promise<ProductListResponse> {
    const { page, page_size } = productListDto;

    const total = await this.productModel.countDocuments();

    const total_pages = Math.ceil(total / page_size);

    const data = await this.productModel
      .find({ deleted_at: null })
      .skip((page - 1) * page_size)
      .limit(page_size)
      .exec();

    return {
      data,
      page,
      page_size,
      total,
      total_pages,
    };
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findById({
      _id: id,
      deleted_at: null,
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return this.productModel.findById(id);
  }

  async delete(id: string): Promise<void> {
    const product = await this.productModel.find({
      _id: id,
      deleted_at: null,
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    await this.productModel.findByIdAndUpdate(id, {
      deleted_at: new Date(),
    });
  }

  async update(
    id: string,
    productUpdateDto: Partial<ProductCreateRequest>
  ): Promise<Product> {
    const product = await this.productModel.find({
      _id: id,
      deleted_at: null,
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    await this.productModel.findByIdAndUpdate(id, {
      ...productUpdateDto,
      updated_at: new Date(),
    });

    return this.productModel.findById(id);
  }
}
