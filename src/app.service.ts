import { Injectable } from "@nestjs/common";
import { HealthCheckService, MongooseHealthIndicator } from "@nestjs/terminus";

import { service_config } from "@config/service.config";

@Injectable()
export class AppService {
  constructor(
    private mongooseHealthIndicator: MongooseHealthIndicator,
    private health: HealthCheckService
  ) {}

  getHello() {
    return service_config;
  }

  getHealth() {
    return this.health.check([
      () =>
        this.mongooseHealthIndicator.pingCheck("mongodb", {
          timeout: 1500,
        }),
    ]);
  }
}
