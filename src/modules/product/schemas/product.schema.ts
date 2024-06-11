import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import { Factory } from "nestjs-seeder";

@Schema({ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })
export class Product extends Document {
  @ApiProperty({ example: "Apple", description: "Name of the product" })
  @Factory((faker) => faker.commerce.productName())
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    example: "This is an apple",
    description: "Description of the product",
  })
  @Factory((faker) => faker.commerce.productDescription())
  @Prop({ type: String })
  description: string;

  @ApiProperty({ example: 0.5, description: "Price of the product" })
  @Factory((faker) => faker.commerce.price())
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty({ example: 10, description: "Stock of the product" })
  @Factory((faker) => faker.number.int({ min: 1, max: 100 }))
  @Prop({ type: Number, required: true })
  stock: number;

  @ApiProperty({ example: "Fruit", description: "Category of the product" })
  @Factory((faker) => faker.commerce.department())
  @Prop({ type: String, required: true })
  category: string;

  @ApiProperty({
    example: "2021-09-01T00:00:00.000Z",
    description: "Deleted at",
  })
  @Prop({ type: Date, default: null })
  deleted_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
