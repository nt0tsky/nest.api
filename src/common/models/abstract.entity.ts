import {PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";

/**
 * * Тип идентификатора
 */
export type Identity = number;

/**
 * * Интерфейс сущности имеющий идентификатор
 */
export interface IIdentity {
  id: Identity;
}

/**
 * * Базовый класс сущности
 * * Имеет общий для всех сущностей тип, такой как идентификатор
 */
@ObjectType()
export abstract class AbstractEntity implements IIdentity {
  @PrimaryGeneratedColumn()
  @Field({nullable: false})
  id: Identity;
}