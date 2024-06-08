class Environment {
  private _environment = process.env.NODE_ENV?.trim() as EnumEnvironment;

  get environment() {
    return this._environment;
  }

  get is_test() {
    return this._environment === "test";
  }

  get is_development() {
    return this._environment === "development";
  }

  get is_production() {
    return this._environment === "production";
  }
}

export default new Environment();

export enum EnumEnvironment {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  TEST = "test",
}
