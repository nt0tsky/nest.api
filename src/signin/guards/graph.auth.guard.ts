import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
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