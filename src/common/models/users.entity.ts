import {AbstractEntity} from "./abstract.entity";
import {Column, Entity, Index} from "typeorm";

/**
 * * Сущность пользователя без персональных данных
 */
export class UsersDTO extends AbstractEntity {
  @Index({unique: true})
  @Column()
  email: string

  @Column({name: "user_name", nullable: true})
  userName: string
}

/**
 * * Сущность пользователя
 */
@Entity()
export class Users extends UsersDTO {
  @Column()
  password: string
}