import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1692064070349 implements MigrationInterface {
  name = 'NewMigration1692064070349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "base_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_e83ac1191478b1697152ab50083" UNIQUE ("name"), CONSTRAINT "PK_69819e00439f23c44685f8ae76b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_2f6c45e2a9d513d6fd81b465f2e" UNIQUE ("name"), CONSTRAINT "PK_d9c30f463126c349076ff867ac7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "hp" integer NOT NULL, "attack" integer NOT NULL, "def" integer NOT NULL, "speed" integer NOT NULL, "baseTypeId" uuid, CONSTRAINT "PK_9d95b6eedf1fbbea6b329b91f81" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "catched_monster" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "monsterId" uuid, "userId" uuid, CONSTRAINT "PK_66cda7d31d17e6a07e373838d01" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hp" integer NOT NULL, "attack" integer NOT NULL, "def" integer NOT NULL, "speed" integer NOT NULL, CONSTRAINT "PK_132de903d366f4c06cd586c43c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster_monster_types_monster_type" ("monsterId" uuid NOT NULL, "monsterTypeId" uuid NOT NULL, CONSTRAINT "PK_d65878967f3b6328f8a5921d102" PRIMARY KEY ("monsterId", "monsterTypeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f26eb44eee0c3059d31d29491d" ON "monster_monster_types_monster_type" ("monsterId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c78ed87188a8bfb7691e31900b" ON "monster_monster_types_monster_type" ("monsterTypeId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "monster" ADD CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "catched_monster" ADD CONSTRAINT "FK_6e44ad6fe4cc755720a6ab3e42b" FOREIGN KEY ("monsterId") REFERENCES "monster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "catched_monster" ADD CONSTRAINT "FK_7229dfd1979eb99b06241d34fb1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_monster_types_monster_type" ADD CONSTRAINT "FK_f26eb44eee0c3059d31d29491dd" FOREIGN KEY ("monsterId") REFERENCES "monster"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_monster_types_monster_type" ADD CONSTRAINT "FK_c78ed87188a8bfb7691e31900b0" FOREIGN KEY ("monsterTypeId") REFERENCES "monster_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monster_monster_types_monster_type" DROP CONSTRAINT "FK_c78ed87188a8bfb7691e31900b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_monster_types_monster_type" DROP CONSTRAINT "FK_f26eb44eee0c3059d31d29491dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "catched_monster" DROP CONSTRAINT "FK_7229dfd1979eb99b06241d34fb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "catched_monster" DROP CONSTRAINT "FK_6e44ad6fe4cc755720a6ab3e42b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster" DROP CONSTRAINT "FK_29da7b186ef992e226d9be961a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c78ed87188a8bfb7691e31900b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f26eb44eee0c3059d31d29491d"`,
    );
    await queryRunner.query(`DROP TABLE "monster_monster_types_monster_type"`);
    await queryRunner.query(`DROP TABLE "stat"`);
    await queryRunner.query(`DROP TABLE "catched_monster"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "monster"`);
    await queryRunner.query(`DROP TABLE "monster_type"`);
    await queryRunner.query(`DROP TABLE "base_type"`);
  }
}
