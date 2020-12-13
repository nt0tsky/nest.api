import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

/**
 * * Guard авторизации
 * * В случае отсутствия юзера в базе данных
 * * Выбрасываем ошибку UnauthorizedException
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
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