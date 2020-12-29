import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

import * as dotenv from "dotenv";

dotenv.config()

export type DatabaseConfig = {
  type: string
  host: string
  port: number
  user: string
  password: string
  database: string
}

export type OrmConfig = {
  entities: string[]
  migrationsTableName: string
  migrations: string[]
  cli: {
    migrationsDir: string
  }
}

export type JWTConfig = {
  secretKey: string
  expiresIn: number
}

@Injectable()
export class ConfigService {
  constructor(private readonly env: { [key: string]: string | undefined }) {
  }

  get(key: string): string {
    return this.env[key];
  }

  getOrThrow(key: string): string | never {
    const value = this.get(key);

    if (!value) {
      throw new Error(`config error - missing key: ${key}`)
    }

    return value;
  }

  ensureValues(keys: string[]): ConfigService {
    for (const key of keys) {
      this.getOrThrow(key);
    }

    return this;
  }

  getDatabaseConfig(): DatabaseConfig {
    return {
      type: this.get("TYPEORM_CONNECTION"),
      host: this.get("TYPEORM_HOST"),
      port: +this.get("TYPEORM_PORT"),
      user: this.get("TYPEORM_USERNAME"),
      password: this.get("TYPEORM_PASSWORD"),
      database: this.get("TYPEORM_DATABASE")
    }
  }

  getJWTConfig(): JWTConfig {
    return {
      secretKey: this.get("JWT_SECRET_KEY"),
      expiresIn: +this.get("JWT_EXPIRES_IN_SEC")
    }
  }

  getOrmConfig(): OrmConfig {
    return {
      entities: [this.get("TYPEORM_ENTITIES")],

      migrationsTableName: this.get("TYPEORM_MIGRATIONS_TABLE_NAME"),

      migrations: [this.get("TYPEORM_MIGRATIONS")],

      cli: {
        migrationsDir: this.get("TYPEORM_MIGRATIONS_DIR"),
      }
    }
  }

  getOrmModuleOptions(): TypeOrmModuleOptions {
    const {user, ...database} = this.getDatabaseConfig();
    const ormOptions = this.getOrmConfig();

    return {...database, ...ormOptions, username: user} as TypeOrmModuleOptions
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    "TYPEORM_CONNECTION",
    "TYPEORM_HOST",
    "TYPEORM_PORT",
    "TYPEORM_USERNAME",
    "TYPEORM_PASSWORD",
    "TYPEORM_DATABASE",
    "TYPEORM_ENTITIES",
    "TYPEORM_MIGRATIONS",
    "TYPEORM_MIGRATIONS_DIR"
  ]);

export {configService}