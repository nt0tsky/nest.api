import {AbstractEntity} from "@/common/models/abstract.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {Users} from "@/common/models/users.entity";

@Entity()
@ObjectType()
export class Bookmark extends AbstractEntity {
  @Field((type) => Users, {nullable: false})
  @ManyToOne(() => Users, user => user.Bookmarks)
  user: Users;

  @Column({type: "text"})
  @Field({nullable: false})
  description: string;
}