import * as request from "supertest";
import { INestApplication } from "@nestjs/common";

import { getApp } from "../../../../test/testing-module";
import { ProductCreateResponse } from "../dtos/product-create.dto";
import { products_create } from "./mocks/product-create.mock";
import { Model } from "mongoose";
import { Product } from "../schemas/product.schema";
import { getModelToken } from "@nestjs/mongoose";
import { products_list } from "./mocks/product-list.mock";
import { ProductFindByIdResponse } from "../dtos/product-find-id.dto";

const endpoint = "/product/:id";

describe(`[GET] Product Find`, () => {
  let app: INestApplication;
  let product_model: Model<Product>;

  beforeAll(async () => {
    app = await getApp();
  });

  describe("Find product by id successfully", () => {
    let body: ProductFindByIdResponse;
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
      ({ body, status } = await request(app.getHttpServer()).get(
        endpoint.replace(":id", id.toString())
      ));
    });

    it("Then it should return HTTP 200", () => {
      expect(status).toBe(200);
      expect(body).toBeDefined();
    });

    it("Product find by id successfully", () => {
      expect(body).toEqual(
        expect.objectContaining({
          name: product_create.name,
          price: product_create.price,
          description: product_create.description,
          category: product_create.category,
          stock: product_create.stock,
        })
      );
    });
    it("Not found product by id", async () => {
      const id = "5f3f1d2f7b4e3a001f0d4f2e";
      const { status } = await request(app.getHttpServer())
        .get(endpoint.replace(":id", id))
        .send(products_create);

      expect(status).toBe(404);
    });
  });
});
