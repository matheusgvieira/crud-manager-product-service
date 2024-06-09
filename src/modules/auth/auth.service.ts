import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as jwt from "jsonwebtoken";
import { ClientCredentials } from "./schemas/client-credentials.schema";
import { Model } from "mongoose";
import { auth_config } from "@config/auth.config";
import { AuthAccessTokeRequest } from "./dtos/auth-access-token.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ClientCredentials.name)
    private readonly clientCredentialsModel: Model<ClientCredentials>
  ) {}
  async validateClient(
    client_id: string,
    client_secret: string
  ): Promise<ClientCredentials> {
    const client = await this.clientCredentialsModel.findOne({
      client_id,
      client_secret,
    });

    return client;
  }

  async generateAccessToken({
    client_id,
    client_secret,
  }: AuthAccessTokeRequest): Promise<string> {
    const client = await this.validateClient(client_id, client_secret);

    if (!client) {
      throw new UnauthorizedException();
    }

    const payload = { client_id };

    return jwt.sign(payload, auth_config.jwt_secret, { expiresIn: "1h" });
  }
}
