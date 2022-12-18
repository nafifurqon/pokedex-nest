import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1671362646556 implements MigrationInterface {
  name = 'CreateAllTables1671362646556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "base_type" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_e83ac1191478b1697152ab50083" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stat" ("id" varchar PRIMARY KEY NOT NULL, "hp" integer NOT NULL, "attack" integer NOT NULL, "def" integer NOT NULL, "speed" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, "statId" varchar, CONSTRAINT "REL_2034b73e2436a1a6e7b9c0d221" UNIQUE ("statId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster_type" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_2f6c45e2a9d513d6fd81b465f2e" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar CHECK( "role" IN ('ADMIN','USER') ) NOT NULL DEFAULT ('USER'), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "catched_monster" ("id" varchar PRIMARY KEY NOT NULL, "monsterId" varchar, "userId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster_monster_types_monster_type" ("monsterId" varchar NOT NULL, "monsterTypeId" varchar NOT NULL, PRIMARY KEY ("monsterId", "monsterTypeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f26eb44eee0c3059d31d29491d" ON "monster_monster_types_monster_type" ("monsterId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c78ed87188a8bfb7691e31900b" ON "monster_monster_types_monster_type" ("monsterTypeId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, "statId" varchar, CONSTRAINT "REL_2034b73e2436a1a6e7b9c0d221" UNIQUE ("statId"), CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_2034b73e2436a1a6e7b9c0d2218" FOREIGN KEY ("statId") REFERENCES "stat" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_monster"("id", "name", "description", "baseTypeId", "statId") SELECT "id", "name", "description", "baseTypeId", "statId" FROM "monster"`,
    );
    await queryRunner.query(`DROP TABLE "monster"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_monster" RENAME TO "monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_catched_monster" ("id" varchar PRIMARY KEY NOT NULL, "monsterId" varchar, "userId" varchar, CONSTRAINT "FK_6e44ad6fe4cc755720a6ab3e42b" FOREIGN KEY ("monsterId") REFERENCES "monster" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7229dfd1979eb99b06241d34fb1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_catched_monster"("id", "monsterId", "userId") SELECT "id", "monsterId", "userId" FROM "catched_monster"`,
    );
    await queryRunner.query(`DROP TABLE "catched_monster"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_catched_monster" RENAME TO "catched_monster"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_f26eb44eee0c3059d31d29491d"`);
    await queryRunner.query(`DROP INDEX "IDX_c78ed87188a8bfb7691e31900b"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_monster_monster_types_monster_type" ("monsterId" varchar NOT NULL, "monsterTypeId" varchar NOT NULL, CONSTRAINT "FK_f26eb44eee0c3059d31d29491dd" FOREIGN KEY ("monsterId") REFERENCES "monster" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_c78ed87188a8bfb7691e31900b0" FOREIGN KEY ("monsterTypeId") REFERENCES "monster_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("monsterId", "monsterTypeId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_monster_monster_types_monster_type"("monsterId", "monsterTypeId") SELECT "monsterId", "monsterTypeId" FROM "monster_monster_types_monster_type"`,
    );
    await queryRunner.query(`DROP TABLE "monster_monster_types_monster_type"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_monster_monster_types_monster_type" RENAME TO "monster_monster_types_monster_type"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f26eb44eee0c3059d31d29491d" ON "monster_monster_types_monster_type" ("monsterId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c78ed87188a8bfb7691e31900b" ON "monster_monster_types_monster_type" ("monsterTypeId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_c78ed87188a8bfb7691e31900b"`);
    await queryRunner.query(`DROP INDEX "IDX_f26eb44eee0c3059d31d29491d"`);
    await queryRunner.query(
      `ALTER TABLE "monster_monster_types_monster_type" RENAME TO "temporary_monster_monster_types_monster_type"`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster_monster_types_monster_type" ("monsterId" varchar NOT NULL, "monsterTypeId" varchar NOT NULL, PRIMARY KEY ("monsterId", "monsterTypeId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "monster_monster_types_monster_type"("monsterId", "monsterTypeId") SELECT "monsterId", "monsterTypeId" FROM "temporary_monster_monster_types_monster_type"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_monster_monster_types_monster_type"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c78ed87188a8bfb7691e31900b" ON "monster_monster_types_monster_type" ("monsterTypeId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f26eb44eee0c3059d31d29491d" ON "monster_monster_types_monster_type" ("monsterId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "catched_monster" RENAME TO "temporary_catched_monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "catched_monster" ("id" varchar PRIMARY KEY NOT NULL, "monsterId" varchar, "userId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "catched_monster"("id", "monsterId", "userId") SELECT "id", "monsterId", "userId" FROM "temporary_catched_monster"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_catched_monster"`);
    await queryRunner.query(
      `ALTER TABLE "monster" RENAME TO "temporary_monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, "statId" varchar, CONSTRAINT "REL_2034b73e2436a1a6e7b9c0d221" UNIQUE ("statId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "monster"("id", "name", "description", "baseTypeId", "statId") SELECT "id", "name", "description", "baseTypeId", "statId" FROM "temporary_monster"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_monster"`);
    await queryRunner.query(`DROP INDEX "IDX_c78ed87188a8bfb7691e31900b"`);
    await queryRunner.query(`DROP INDEX "IDX_f26eb44eee0c3059d31d29491d"`);
    await queryRunner.query(`DROP TABLE "monster_monster_types_monster_type"`);
    await queryRunner.query(`DROP TABLE "catched_monster"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "monster_type"`);
    await queryRunner.query(`DROP TABLE "monster"`);
    await queryRunner.query(`DROP TABLE "stat"`);
    await queryRunner.query(`DROP TABLE "base_type"`);
  }
}
