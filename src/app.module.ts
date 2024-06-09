import "./shared/utils/env.util";
import { TerminusModule } from "@nestjs/terminus";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { mongo_config } from "@config/mongo.config";
import { MongoMemoryServer } from "mongodb-memory-server";
import Environment from "@shared/utils/environment.util";
import { ProductModule } from "@modules/product/product.module";
import { AuthModule } from "@modules/auth/auth.module";

@Module({
  imports: [
    TerminusModule,
    MongooseModule.forRootAsync({
      useFactory: async () => {
        if (Environment.is_test) {
          const mongod = await MongoMemoryServer.create();
          const uri = mongod.getUri();
          return {
            uri,
          };
        }
        return {
          uri: mongo_config.url,
        };
      },
    }),
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
