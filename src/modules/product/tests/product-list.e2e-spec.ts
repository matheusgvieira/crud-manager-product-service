import * as request from "supertest";
import { INestApplication } from "@nestjs/common";

import { getApp } from "../../../../test/testing-module";
import {
  ProductListRequest,
  ProductListResponse,
} from "../dtos/product-list.dto";
import { objectToQueryString } from "@shared/utils/parse.util";
import { Model } from "mongoose";
import { Product } from "../schemas/product.schema";
import { getModelToken } from "@nestjs/mongoose";
import { products_list } from "./mocks/product-list.mock";

const endpoint = "/product";

describe(`[GET] Product List`, () => {
  let app: INestApplication;
  let product_model: Model<Product>;

  beforeAll(async () => {
    app = await getApp();
  });

  describe(`Given a GET request to ${endpoint}`, () => {
    beforeAll(async () => {
      product_model = app.get(getModelToken(Product.name));

      await product_model.deleteMany({});

      for (const product of products_list) {
        await product_model.create(product);
      }
    });

    describe("When the endpoint recieves a valid query", () => {
      let body: ProductListResponse;
      let status: number;
      let search_query: ProductListRequest;

      beforeAll(() => {
        search_query = { page: 1, page_size: 10 };
      });

      describe("When the query does not contain optional query fields", () => {
        search_query = { page: 1, page_size: 10 };
        const url_query = objectToQueryString(search_query);

        beforeEach(async () => {
          ({ body, status } = await request(app.getHttpServer()).get(
            `${endpoint}?${url_query}`
          ));
        });

        it("Then it should return HTTP 200", () => {
          expect(status).toBe(200);
        });

        it("Then it should return the same page as requested", () => {
          expect(body.page).toEqual(search_query.page);
        });

        it("Then it should return no more than the returned page size", () => {
          expect(body.data.length).toBeLessThanOrEqual(search_query.page_size);
        });

        it("Then it should return a count of all available results", () => {
          expect(body.total).toBe(body.data.length);
        });

        it("Then it should return a count of available pages", () => {
          expect(body.total_pages).toBe(1);
        });
        it("Then it should return the correct data", () => {
          expect(body.data[0]).toHaveProperty("name");
          expect(body.data[0]).toHaveProperty("price");
          expect(body.data[0]).toHaveProperty("description");
          expect(body.data[0]).toHaveProperty("category");
          expect(body.data[0]).toHaveProperty("stock");
        });
      });
    });
  });
});
