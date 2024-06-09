import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./schemas/product.schema";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Documentation } from "@shared/decorators/documentation.decorator";
import {
  ProductCreateRequest,
  ProductCreateResponse,
} from "./dtos/product-create.dto";
import {
  ProductListRequest,
  ProductListResponse,
} from "./dtos/product-list.dto";
import {
  ProductFindByIdRequest,
  ProductFindByIdResponse,
} from "./dtos/product-find-id.dto";
import { JwtAuthGuard } from "@shared/guards/auth.guard";

@ApiTags("Product")
@ApiBearerAuth()
@Controller("/product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Documentation({
    title: "Create a product",
    responses: [{ type: ProductCreateResponse }],
  })
  async create(
    @Body() productCreateDto: ProductCreateRequest
  ): Promise<ProductCreateResponse> {
    return this.productService.create(productCreateDto);
  }

  @Get()
  @Documentation({
    title: "List all products",
    responses: [{ type: ProductListResponse }],
  })
  async findAll(
    @Query() productListDto: ProductListRequest
  ): Promise<ProductListResponse> {
    return this.productService.getAll(productListDto);
  }

  @Get("/:id")
  @Documentation({
    title: "Get a product by ID",
    responses: [{ type: Product }],
  })
  async findOne(
    @Param() { id }: ProductFindByIdRequest
  ): Promise<ProductFindByIdResponse> {
    return this.productService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  @Documentation({
    title: "Delete a product by ID",
  })
  async delete(@Param() { id }: ProductFindByIdRequest): Promise<void> {
    return this.productService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  @Documentation({
    title: "Update a product by ID",
    responses: [{ type: Product }],
  })
  async update(
    @Param() { id }: ProductFindByIdRequest,
    @Body() productCreateDto: Partial<ProductCreateRequest>
  ): Promise<Product> {
    return this.productService.update(id, productCreateDto);
  }
}
