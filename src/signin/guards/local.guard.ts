import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

/**
 * * Guard авторизации
 * * В случае отсутствия юзера в базе данных
 * * Выбрасываем ошибку UnauthorizedException
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }

  /**
   * * Вызывается автоматически во время вызова метода
   * * В случае если через локальную стратегию мы не нашли пользователя
   * * Выбрасываем ошибку UnauthorizedException
   */
  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}