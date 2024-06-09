import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { Documentation } from "@shared/decorators/documentation.decorator";
import {
  AuthAccessTokeRequest,
  AuthAccessTokenResponse,
} from "./dtos/auth-access-token.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("token")
  @Documentation({
    title: "Get a token",
    responses: [
      { type: AuthAccessTokenResponse, status: 201 },
      { status: 401, description: "Unauthorized", type: UnauthorizedException },
    ],
  })
  async getToken(@Body() authTokenDto: AuthAccessTokeRequest) {
    return {
      access_token: await this.authService.generateAccessToken(authTokenDto),
    };
  }
}
