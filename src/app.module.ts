import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SignUpModule} from "./signup/signup.module";
import {SignInModule} from "./signin/signin.module";
import {configService} from "./config/config.service";
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from '@nestjs/graphql';
import {BookmarkModule} from "@/bookmark/bookmark.module";

@Module({
  imports: [SignUpModule,
    SignInModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot(configService.getOrmModuleOptions()),
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
