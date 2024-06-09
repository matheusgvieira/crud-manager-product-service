import * as request from "supertest";
import { INestApplication } from "@nestjs/common";

import { getApp } from "../../../../test/testing-module";
import { jwtToken } from "../../../../test/jwt";
import { products_create } from "./mocks/product-create.mock";
import { Model } from "mongoose";
import { Product } from "../schemas/product.schema";
import { getModelToken } from "@nestjs/mongoose";
import { products_list } from "./mocks/product-list.mock";

const endpoint = "/product/:id";

describe(`[DELETE] Product Find`, () => {
  let app: INestApplication;
  let product_model: Model<Product>;

  beforeAll(async () => {
    app = await getApp();
  });

  describe("Delete product by id successfully", () => {
    let id;
    const [product_create] = products_list;
    let status: number;

    beforeAll(async () => {
      product_model = app.get(getModelToken(Product.name));

      await product_model.deleteMany({});

      const product_created_before = await product_model.create(product_create);

      id = product_created_before._id;
    });

    beforeEach(async () => {
      ({ status } = await request(app.getHttpServer())
        .delete(endpoint.replace(":id", id.toString()))
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(products_create));
    });

    it("Then it should return HTTP 200", () => {
      expect(status).toBe(200);
    });

    it("Find product by id for check delete process", async () => {
      const product = await product_model.findById(id);

      expect(product.deleted_at).toBeDefined();
    });
  });
});
