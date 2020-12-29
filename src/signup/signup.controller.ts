import {SignUpService} from "./signup.service";
import {Body, Controller, HttpStatus, Logger, Post} from "@nestjs/common";
import {Users} from "@/common/models/users.entity";

/**
 * * Контроллер регистрации
 * * Доступен через url {URL}/signup
 */
@Controller({path: "signup"})
export class SignUpController {
  private readonly logger = new Logger(SignUpController.name);

  /**
   * * Зависимости, которые будут добавлены через Dependency Injection
   * @param signUpService Сервис регистрации
   */
  constructor(private readonly signUpService: SignUpService) {
  }

  /**
   * * Создание пользователя
   * * Во время регистрации идет проверка на существование пользователя с указанным email-адресом
   * * В случае существования возвращаем информацию о существовании пользователя
   * * В случае успешного создания пользователя, возвращаем идентификатор созданного пользователя
   * @param usersDTO Модель пользователя для регистрации
   */
  @Post("/")
  async Create(@Body() usersDTO: Users) {
    try {
      const isExists = await this.signUpService.IsExists(usersDTO.email);

      if (isExists) {
        const error = `user with email: ${usersDTO.email} is already exists`;

        this.logger.error(error);

        return {
          status: HttpStatus.BAD_REQUEST,
          error
        }
      }

      const {id} = await this.signUpService.Create(usersDTO);

      return {
        status: HttpStatus.OK,
        id
      }
    } catch (err) {
      const error = `unknown server error: ${err}`;

      this.logger.error(error);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error
      }
    }
  }
}