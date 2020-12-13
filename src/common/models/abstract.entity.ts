import {PrimaryGeneratedColumn} from "typeorm";

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
export abstract class AbstractEntity implements IIdentity {
  @PrimaryGeneratedColumn()
  id: Identity;
}