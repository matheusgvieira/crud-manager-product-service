import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Factory } from "nestjs-seeder";

@Schema({ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })
export class ClientCredentials extends Document {
  @Factory((faker) => faker.string.uuid())
  @Prop({ required: true, unique: true })
  client_id: string;

  @Factory((faker) => faker.string.sample(12))
  @Prop({ required: true })
  client_secret: string;

  @Factory((faker) => faker.internet.userName())
  @Prop({ required: true })
  name: string;
}

export const ClientCredentialsSchema =
  SchemaFactory.createForClass(ClientCredentials);
