import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { getApp } from "./testing-module";

describe("/ - Root routes", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApp();
  });

  it("Home route", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect({
      service_name: "crud-manager-product-service",
      version: "1.0.0",
    });
  });

  it("Readyz route", () => {
    return request(app.getHttpServer())
      .get("/readyz")
      .expect(200)
      .expect({
        status: "ok",
        info: { mongodb: { status: "up" } },
        error: {},
        details: { mongodb: { status: "up" } },
      });
  });
});
