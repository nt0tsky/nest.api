import {Module} from '@nestjs/common';
import {SignUpService} from "./signup.service";
import {SignUpController} from "./signup.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "@/common/models/users.entity";

/**
 * * Модуль регистрации
 */
@Module({
  imports: [
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
  controllers: [SignUpController],
  /**
   * * Провайдеры используемые в модуле
   * * Которые в свою очередь должны быть помечены декоратором @Injectable
   * * В таком случае они будут доступны для инъекции в контроллер
   */
  providers: [SignUpService],
})
export class SignUpModule {
}
