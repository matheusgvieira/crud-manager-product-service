import Environment from "@shared/utils/environment.util";
import z from "zod";

export const mongo_config = {
  host: process.env.MONGO_HOST?.trim(),
  port: process.env.MONGO_PORT?.trim(),
  user: process.env.MONGO_USER?.trim(),
  password: process.env.MONGO_PASSWORD?.trim(),
  database: process.env.MONGO_DATABASE?.trim(),
  url: `mongodb://${process.env.MONGO_USER?.trim()}:${process.env.MONGO_PASSWORD?.trim()}@${process.env.MONGO_HOST?.trim()}:${process.env.MONGO_PORT?.trim()}/${process.env.MONGO_DATABASE?.trim()}`,
};

export const mongo_config_schema = z.object({
  host: z.string(),
  port: z.string(),
  user: z.string(),
  password: z.string(),
  url: z.string(),
  database: z.string(),
});

if (!Environment.is_test) mongo_config_schema.parse(mongo_config);
