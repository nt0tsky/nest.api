import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from "../common/models/users.entity";
import {encryptToSha256} from "../common/utils";
import {IIdentity} from "../common/models/abstract.entity";

/**
 * * Сервис регистрации
 */
@Injectable()
export class SignUpService {
  /**
   * * При помощи инверсии зависимостей, и инъекции в конструктор
   * * Описываем, что сервис регистрации зависим от менеджера работы с пользователями
   * @param usersRepository
   */
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
  }

  /**
   * * Проверка наличия пользователя с указанным email-адресом
   * * Результат доступа к базе данных через метод count является число
   * * Если количество пользователей является нулем, считаем что пользователь не существует
   * @param email
   * @constructor
   */
  public IsExists(email: string): Promise<boolean> {
    return this.usersRepository.count({
      where: {
        email
      }
    }).then((count: number) => {
      return 0 !== count;
    });
  }

  /**
   * * Создать пользователя
   * @param user Пользователь для создания записи
   */
  public Create(user: Users): Promise<IIdentity> {
    user.password = encryptToSha256(user.password);

    return this.usersRepository.save(user);
  }
}