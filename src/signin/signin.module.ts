import {Module} from '@nestjs/common';
import {SignInService} from "./signin.service";
import {SignInController} from "./signin.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "../common/models/users.entity";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";

/**
 * * Модуль регистрации
 */
@Module({
  imports: [
    /**
     * * Описываем, что используем Passport модуль для возможности использования стратегий
     */
    PassportModule,
    /**
     * * Описываем, что мы будем использовать репозиторий для модели Users
     * * В таком случае в провайдерах этого модуля
     * * Мы можем сделать инъекцию репозитория через @InjectRepository
     */
    TypeOrmModule.forFeature([Users])
  ],
  /**
   * * Контроллеры используемые в модуле
   * * В данные контроллеры можно выполнить инъекцию
   * * Описанных ниже провайдеров
   */
  controllers: [SignInController],
  /**
   * * Провайдеры используемые в модуле
   * * Которые в свою очередь должны быть помечены декоратором @Injectable
   * * В таком случае они будут доступны для инъекции в контроллер
   */
  providers: [SignInService, LocalStrategy],
})
export class SignInModule {
}
