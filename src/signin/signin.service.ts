import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Users, UsersDTO} from "../common/models/users.entity";
import {Repository} from "typeorm";
import {encryptToSha256} from "../common/utils";

/**
 * * Сервис авторизации
 */
@Injectable()
export class SignInService {
  /**
   * * При помощи инверсии зависимостей, и инъекции в конструктор
   * * Описываем, что сервис регистрации зависим от менеджера работы с пользователями
   * @param usersRepository
   */
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
  }

  /**
   * * Проверка существования пользователя
   * * В связи с тем, что персональные данные пользователя храняться в хешированном формате
   * * Перед поиском в базе данных - хешируем пароль, и ищем по захешированному паролю
   * * Если пользователь найден, исключаем пароль и возвращаем ТОЛЬКО данные пользователя
   * @param email Email пользователя
   * @param pass Пароль пользователя
   */
  async validate(email: string, pass: string): Promise<UsersDTO | null> {
    pass = encryptToSha256(pass);

    const user = await this.usersRepository.findOne({
      where: {
        email,
        password: pass
      }
    });

    if (!user) {
      return null;
    }

    const {password, ...other} = user;

    return other;
  }
}