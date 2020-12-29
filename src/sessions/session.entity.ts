import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'session'})
export class Session {
  @PrimaryColumn({type: "varchar"})
  sid: string

  @Column({type: "json"})
  sess: string;

  @Column({type: "timestamp"})
  expire: Date;
}