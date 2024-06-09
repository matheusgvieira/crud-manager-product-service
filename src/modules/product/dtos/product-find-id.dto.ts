import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { Product } from "../schemas/product.schema";

export class ProductFindByIdRequest {
  @ApiProperty({ example: "6664782f742e361fa4333f6a" })
  @IsMongoId()
  id: string;
}

export class ProductFindByIdResponse extends Product {}
