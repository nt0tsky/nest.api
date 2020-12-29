import {Controller, Logger, Post, Request, UseGuards} from "@nestjs/common";
import {SignInService} from "./signin.service";
import {LocalAuthGuard} from "./guards/local.guard";
import {UsersDTO} from "@/common/models/users.entity";

/**
 * * Контроллер авторизации
 */
@Controller("/signin")
export class SignInController {
  private readonly logger = new Logger(SignInController.name);

  /**
   * * Зависимости, которые будут добавлены через Dependency Injection
   * @param signInService Сервис авторизации
   */
  constructor(private readonly signInService: SignInService) {
  }

  /**
   * * Авторизация пользователя
   * * авторизация происходит по типу localStrategy, и описана в ./strategies/local.strategy.ts
   */
  @UseGuards(LocalAuthGuard)
  @Post("/")
  async login(@Request() req) {
    this.logger.log("login success", (<UsersDTO>req.user).email);

    return this.signInService.login(req.user);
  }
}