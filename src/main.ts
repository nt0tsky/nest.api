import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import * as connectPgSimple from "connect-pg-simple";
import {configService} from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pgSession = connectPgSimple(session);

  const databaseConfig = configService.getDatabaseConfig();

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: new pgSession({
        conObject: databaseConfig,
        tableName: "session",
        errorLog: (...args: any[]): void => {
          console.log(args);
        }
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}

bootstrap();
