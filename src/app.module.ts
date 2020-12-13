import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SignUpModule} from "./signup/signup.module";
import {SignInModule} from "./signin/signin.module";

@Module({
  imports: [SignUpModule, SignInModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'netology',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    /**
     * * Использовать ток на этапе разработке\показа
     */
    synchronize: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
