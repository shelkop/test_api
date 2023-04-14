import { Init1681477566496 } from '../migrations/1681477566496-init';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    autoLoadEntities: true,
    migrationsTableName: 'migrations',
    migrations: [Init1681477566496],
    migrationsRun: true,
  },
});
