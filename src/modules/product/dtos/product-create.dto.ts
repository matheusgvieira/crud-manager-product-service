import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Product } from "../schemas/product.schema";

export class ProductCreateRequest {
  @ApiProperty({ example: "Banana" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 0.58 })
  @IsNumber()
  @Min(0.01)
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: "Fruit" })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: "This is a banana" })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class ProductCreateResponse {
  @ApiProperty({ type: Product })
  product: Product;

  @ApiProperty({ example: "Product created successfully" })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;
}
