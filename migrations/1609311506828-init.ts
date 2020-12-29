import {MigrationInterface, QueryRunner} from "typeorm";

export class init1609311506828 implements MigrationInterface {
    name = 'init1609311506828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "user_name" character varying, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "description" text NOT NULL, "userId" integer, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("sid" character varying NOT NULL, "sess" json NOT NULL, "expire" TIMESTAMP NOT NULL, CONSTRAINT "PK_7575923e18b495ed2307ae629ae" PRIMARY KEY ("sid"))`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
