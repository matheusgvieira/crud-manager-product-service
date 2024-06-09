import * as request from "supertest";
import { INestApplication } from "@nestjs/common";

import { getApp } from "../../../../test/testing-module";
import { ProductCreateResponse } from "../dtos/product-create.dto";
import { products_create } from "./mocks/product-create.mock";
import { Model } from "mongoose";
import { Product } from "../schemas/product.schema";
import { getModelToken } from "@nestjs/mongoose";
import {
  products_update_created,
  products_updated,
} from "./mocks/product-update.mock";
import { ProductFindByIdResponse } from "../dtos/product-find-id.dto";

const endpoint = "/product/:id";

describe(`[GET] Product Update`, () => {
  let app: INestApplication;
  let product_model: Model<Product>;

  beforeAll(async () => {
    app = await getApp();
  });

  describe("Update product by id successfully", () => {
    let body: ProductFindByIdResponse;
    let id;
    let status: number;

    beforeAll(async () => {
      product_model = app.get(getModelToken(Product.name));

      await product_model.deleteMany({});

      const product_created_before = await product_model.create(
        products_update_created
      );

      id = product_created_before._id;
    });

    beforeEach(async () => {
      ({ body, status } = await request(app.getHttpServer())
        .put(endpoint.replace(":id", id.toString()))
        .send(products_updated));
    });

    it("Then it should return HTTP 200", () => {
      expect(status).toBe(200);
      expect(body).toBeDefined();
    });

    it("Product find by id successfully", () => {
      expect(body).toEqual(
        expect.objectContaining({
          name: products_updated.name,
          price: products_updated.price,
          description: products_updated.description,
          category: products_updated.category,
          stock: products_updated.stock,
        })
      );
    });
  });
});
