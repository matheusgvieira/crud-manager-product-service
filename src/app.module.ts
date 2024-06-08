import "./shared/utils/env.util";
import { TerminusModule } from "@nestjs/terminus";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { mongo_config } from "@config/mongo.config";

@Module({
  imports: [TerminusModule, MongooseModule.forRoot(mongo_config.url)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
