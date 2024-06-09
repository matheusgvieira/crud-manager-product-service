import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, Min } from "class-validator";

export class AuthAccessTokeRequest {
  @ApiProperty({ example: "481835f1-245a-45eb-af02-bf65a01f458e" })
  @IsUUID()
  client_id: string;

  @ApiProperty({ example: "ZGQyYzJiNDYtMTRmMy00OTQ1LWIzYTE=" })
  @IsString()
  @IsNotEmpty()
  client_secret: string;
}

export class AuthAccessTokenResponse {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" })
  access_token: string;
}
