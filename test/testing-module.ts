import '../src/shared/utils/env.util';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

export async function getApp(data: IApp = {}): Promise<INestApplication> {
  const module = Test.createTestingModule({
    imports: [AppModule],
  });

  if (data.module) data.module(module);

  const module_fixture: TestingModule = await module.compile();

  if (data.getModule) data.getModule(module_fixture);

  const app = module_fixture.createNestApplication<NestExpressApplication>({
    logger: ['error'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  return app.init();
}

type IApp = {
  module?: (data: TestingModuleBuilder) => void;
  getModule?: (data: TestingModule) => void;
};
