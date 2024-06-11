import { Product } from "@modules/product/schemas/product.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";

@Injectable()
export class ProductSeeder implements Seeder {
  constructor(
    @InjectModel(Product.name)
    private readonly user: Model<Product>
  ) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const products = DataFactory.createForClass(Product).generate(50);

    console.log("🌱 Products createds \n");

    // Insert into the database.
    return this.user.insertMany(products);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
