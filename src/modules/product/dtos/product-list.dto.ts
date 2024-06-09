import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../schemas/product.schema";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class ProductCreated extends Product {
  @ApiProperty({ example: "6664782f742e361fa4333f6a" })
  _id: string;

  @ApiProperty({ example: "2024-06-09T00:49:41.493Z" })
  created_at: string;

  @ApiProperty({ example: "2024-06-09T00:49:41.493Z" })
  updated_at: string;
}

export class ProductListResponse {
  @ApiProperty({ type: [ProductCreated] })
  data: Product[];
  @ApiProperty()
  page: number;
  @ApiProperty()
  page_size: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  total_pages: number;
}

export class ProductListRequest {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number;

  @ApiProperty({ example: 25 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page_size: number;
}
