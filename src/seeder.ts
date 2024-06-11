import "@shared/utils/env.util";
import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientCredentialsSeeder } from "@shared/database/seeders/client_credentials.seeder";
import {
  ClientCredentials,
  ClientCredentialsSchema,
} from "@modules/auth/schemas/client-credentials.schema";
import { mongo_config } from "@config/mongo.config";
import { ProductSeeder } from "@shared/database/seeders/product.seeder";
import {
  Product,
  ProductSchema,
} from "@modules/product/schemas/product.schema";

seeder({
  imports: [
    MongooseModule.forRoot(mongo_config.url),
    MongooseModule.forFeature([
      { name: ClientCredentials.name, schema: ClientCredentialsSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
}).run([ClientCredentialsSeeder, ProductSeeder]);
