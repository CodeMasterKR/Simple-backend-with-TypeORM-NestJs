import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Kamronbek196769*',
  database: 'typeorm_project',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};