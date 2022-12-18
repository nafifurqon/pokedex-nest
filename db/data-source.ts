import { DataSource, DataSourceOptions } from 'typeorm';

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/db/migrations/*.js'],
//   logging: true,
// };

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  logging: true,
  ssl: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
