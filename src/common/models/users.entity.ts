import {AbstractEntity} from "./abstract.entity";
import {Column, Entity, Index, OneToMany} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {Bookmark} from "@/bookmark/models/bookmark.entity";

/**
 * * Сущность пользователя
 */
@Entity()
@ObjectType()
export class Users extends AbstractEntity {
  @Field({nullable: false})
  @Index({unique: true})
  @Column()
  email: string;

  @Field({nullable: true})
  @Column({name: "user_name", nullable: true})
  userName: string;

  @Column()
  password: string;

  @Field(type => [Bookmark], {nullable: true})
  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  Bookmarks: Bookmark[]
}

// Сущность пользователя без учета пароля
export type UsersDTO = Omit<Users, 'password'>

export type UsersJWTDTO = Pick<UsersDTO, "id" | "email">