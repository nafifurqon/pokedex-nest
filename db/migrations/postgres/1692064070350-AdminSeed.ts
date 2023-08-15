import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import appConfig from 'src/config/app.config';

export class AdminSeed1671364741796 implements MigrationInterface {
  name = 'AdminSeed1671364741796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const APP_SECRET = await appConfig().appSecret;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('Admin!2022', salt);

    await queryRunner.query(
      `
			INSERT INTO public.user (id, email, password, role)
			VALUES('7c60299c-199d-4eb9-a36c-b233a3f9ae5a', 'admin@pokedex.com', '${password}', 'ADMIN');			
			`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user WHERE email = 'admin@pokedex.com'`,
    );
  }
}
