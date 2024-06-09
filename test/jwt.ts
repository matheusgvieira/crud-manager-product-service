import * as jwt from "jsonwebtoken";

export let jwtToken: string;

beforeAll(async () => {
  const payload = { clientId: "client1" };

  jwtToken = jwt.sign(payload, process.env.JWT_SECRET?.trim(), {
    expiresIn: "1h",
  });
});
