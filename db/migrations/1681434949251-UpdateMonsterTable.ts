import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMonsterTable1681434949251 implements MigrationInterface {
  name = 'UpdateMonsterTable1681434949251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, "statId" varchar, CONSTRAINT "REL_2034b73e2436a1a6e7b9c0d221" UNIQUE ("statId"), CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_monster"("id", "name", "description", "baseTypeId", "statId") SELECT "id", "name", "description", "baseTypeId", "statId" FROM "monster"`,
    );
    await queryRunner.query(`DROP TABLE "monster"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_monster" RENAME TO "monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_monster"("id", "name", "description", "baseTypeId") SELECT "id", "name", "description", "baseTypeId" FROM "monster"`,
    );
    await queryRunner.query(`DROP TABLE "monster"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_monster" RENAME TO "monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, "hp" integer NOT NULL, "attack" integer NOT NULL, "def" integer NOT NULL, "speed" integer NOT NULL, CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_monster"("id", "name", "description", "baseTypeId") SELECT "id", "name", "description", "baseTypeId" FROM "monster"`,
    );
    await queryRunner.query(`DROP TABLE "monster"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_monster" RENAME TO "monster"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monster" RENAME TO "temporary_monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "monster"("id", "name", "description", "baseTypeId") SELECT "id", "name", "description", "baseTypeId" FROM "temporary_monster"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_monster"`);
    await queryRunner.query(
      `ALTER TABLE "monster" RENAME TO "temporary_monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, "statId" varchar, CONSTRAINT "REL_2034b73e2436a1a6e7b9c0d221" UNIQUE ("statId"), CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "monster"("id", "name", "description", "baseTypeId") SELECT "id", "name", "description", "baseTypeId" FROM "temporary_monster"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_monster"`);
    await queryRunner.query(
      `ALTER TABLE "monster" RENAME TO "temporary_monster"`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "baseTypeId" varchar, "statId" varchar, CONSTRAINT "REL_2034b73e2436a1a6e7b9c0d221" UNIQUE ("statId"), CONSTRAINT "FK_2034b73e2436a1a6e7b9c0d2218" FOREIGN KEY ("statId") REFERENCES "stat" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_29da7b186ef992e226d9be961a9" FOREIGN KEY ("baseTypeId") REFERENCES "base_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "monster"("id", "name", "description", "baseTypeId", "statId") SELECT "id", "name", "description", "baseTypeId", "statId" FROM "temporary_monster"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_monster"`);
  }
}
