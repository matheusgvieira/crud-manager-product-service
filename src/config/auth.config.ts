import Environment from "@shared/utils/environment.util";
import z from "zod";

export const auth_config = {
  jwt_secret: process.env.JWT_SECRET?.trim(),
};

export const auth_config_schema = z.object({
  jwt_secret: z.string(),
});

if (!Environment.is_test) auth_config_schema.parse(auth_config);
