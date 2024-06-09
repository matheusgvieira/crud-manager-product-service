import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })
export class ClientCredentials extends Document {
  @Prop({ required: true, unique: true })
  client_id: string;

  @Prop({ required: true })
  client_secret: string;

  @Prop({ required: true })
  name: string;
}

export const ClientCredentialsSchema =
  SchemaFactory.createForClass(ClientCredentials);
