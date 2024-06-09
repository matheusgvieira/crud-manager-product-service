import * as request from "supertest";
import { INestApplication } from "@nestjs/common";

import { getApp } from "../../../../test/testing-module";
import { ProductCreateResponse } from "../dtos/product-create.dto";
import { products_create } from "./mocks/product-create.mock";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../schemas/product.schema";

const endpoint = "/product";

describe(`[POST] Product Create`, () => {
  let app: INestApplication;
  let product_model: Model<Product>;

  beforeAll(async () => {
    app = await getApp();
  });

  describe("Create product successfully", () => {
    let body: ProductCreateResponse;
    let status: number;

    beforeAll(async () => {
      product_model = app.get(getModelToken(Product.name));

      await product_model.deleteMany({});
    });

    beforeEach(async () => {
      ({ body, status } = await request(app.getHttpServer())
        .post(endpoint)
        .send(products_create));
    });

    it("Then it should return HTTP 201", () => {
      expect(status).toBe(201);
      expect(body.message).toBe("Product created successfully");
      expect(body.success).toBeTruthy();
      expect(body.product).toBeDefined();
      expect(body.product.name).toBe(products_create.name);
      expect(body.product.price).toBe(products_create.price);
    });
  });
});
