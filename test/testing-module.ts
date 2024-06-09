import "../src/shared/utils/env.util";

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Test, TestingModule, TestingModuleBuilder } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { getModelToken } from "@nestjs/mongoose";
import { ClientCredentials } from "@modules/auth/schemas/client-credentials.schema";

export async function getApp(data: IApp = {}): Promise<INestApplication> {
  const module = Test.createTestingModule({
    imports: [AppModule],
  });

  if (data.module) data.module(module);

  const module_fixture: TestingModule = await module.compile();

  if (data.getModule) data.getModule(module_fixture);

  const app = module_fixture.createNestApplication<NestExpressApplication>({
    logger: ["error"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const app_init = await app.init();

  const client_credentials_model = app_init.get(
    getModelToken(ClientCredentials.name)
  );

  await client_credentials_model.deleteMany({});

  await client_credentials_model.create({
    client_id: "client1",
    client_secret: "secret1",
    name: "Client 1",
  });

  return app_init;
}

type IApp = {
  module?: (data: TestingModuleBuilder) => void;
  getModule?: (data: TestingModule) => void;
};
