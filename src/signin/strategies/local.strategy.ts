import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {SignInService} from '../signin.service';
import {UsersDTO} from "../../common/models/users.entity";

/**
 * * Локальная стратегия авторизации
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * * При помощи инверсии зависимостей, и инъекции в конструктор
   * * Описываем, что сервис регистрации зависим от сервиса авторизации
   * @param signInService
   */
  constructor(private readonly signInService: SignInService) {
    /**
     * * Указываем библиотеке passport.js, что поле в котором будет почтовый адрес будет email вместо username(по умолчанию)
     */
    super({usernameField: "email"});
  }

  /**
   * * Валидация пользователя
   * * Вызывается во время авторизации пользователя
   * * В случае отсутствия пользователя с указанными данными - сообщаем ошибку, что пользователь не авторизован
   * @param email
   * @param password
   */
  async validate(email: string, password: string): Promise<UsersDTO | null> {
    const user = await this.signInService.validate(email, password);

    if (!user) {
      return null;
    }

    return user;
  }
}