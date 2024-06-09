import { auth_config } from "@config/auth.config";
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      if (!authorization || authorization.trim() === "") {
        throw new UnauthorizedException("Please provide token");
      }
      const authToken = authorization.replace(/Bearer/gim, "").trim();

      const resp = await jwt.verify(authToken, auth_config.jwt_secret);

      request.decodedData = resp;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        error.message ?? "session expired! Please sign In"
      );
    }
  }
}
