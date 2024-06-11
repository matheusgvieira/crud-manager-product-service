import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as morgan from "morgan";

import { DocumentationUtils } from "@shared/utils/docs.util";

import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("CrudManagerProductService");
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  app.use(morgan("dev"));
  app.enableShutdownHooks();
  app.enableCors();

  new DocumentationUtils().config(app);

  await app.listen(3333, () => {
    logger.log("⚡ Server running on http://localhost:3333");
    logger.log("📄 Server running on http://localhost:3333/docs");
  });
}
bootstrap();
