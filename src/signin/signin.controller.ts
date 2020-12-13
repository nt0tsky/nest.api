import {Controller, Post, Request, UseGuards} from "@nestjs/common";
import {SignInService} from "./signin.service";
import {LocalAuthGuard} from "./guards/local.guard";

/**
 * * Контроллер авторизации
 */
@Controller("/signin")
export class SignInController {
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
    return req.user;
  }
}