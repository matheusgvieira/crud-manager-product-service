import { ProductCreateRequest } from "@modules/product/dtos/product-create.dto";

export const products_list: ProductCreateRequest[] = [
  {
    name: "Product 1",
    price: 100,
    description: "Description 1",
    category: "Category 1",
    stock: 10,
  },
  {
    name: "Product 2",
    price: 200,
    description: "Description 2",
    category: "Category 2",
    stock: 20,
  },
  {
    name: "Product 3",
    price: 300,
    description: "Description 3",
    category: "Category 3",
    stock: 30,
  },
  {
    name: "Product 4",
    price: 400,
    description: "Description 4",
    category: "Category 4",
    stock: 40,
  },
  {
    name: "Product 5",
    price: 500,
    description: "Description 5",
    category: "Category 4",
    stock: 40,
  },
];
