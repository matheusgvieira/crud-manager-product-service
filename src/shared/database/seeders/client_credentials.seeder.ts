import { ClientCredentials } from "@modules/auth/schemas/client-credentials.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";

@Injectable()
export class ClientCredentialsSeeder implements Seeder {
  constructor(
    @InjectModel(ClientCredentials.name)
    private readonly user: Model<ClientCredentials>
  ) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(ClientCredentials).generate(1);

    console.log("🌱 Users createds \n", { users });

    // Insert into the database.
    return this.user.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
