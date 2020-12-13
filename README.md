## авторизация и регистрация в NestJS
---
### Описание:
- Для решения поставленной задачи был использован Framework(**программное обеспечение облегчающее разработку**) [NestJS](www.nestjs.com) для платформы [NodeJS](https://nodejs.org) который в свою очередь основан на движке V8.
- Данный сервис предоставляет функциональность для регистрации и авторизации пользователей.
- Для хранения данных пользователей использована [SQLite](https://ru.wikipedia.org/wiki/SQLite)

### Проблемы и решения
- Во время регистрации пользователей требуется хранить персональные данные, такие как:
    - пароли
    - данные карт
 
  и возможна ситуация, когда третьи лица могут получить доступ до персональных данных пользователей, стандартом является [хеширование](https://www.kaspersky.ru/blog/the-wonders-of-hashing/3633/) этих данных.
 
- С ростом размера приложения, будут появляться ситуации, когда малейшее изменение одного участка кода - может привести к выходу к поломке другого, [покрывайте тестами](https://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5) критичные участки кода

### Пояснения к коду
- Все пояснения описаны в коде в комментариях в классам\методам