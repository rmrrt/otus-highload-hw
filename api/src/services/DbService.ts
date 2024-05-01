import { Pool } from 'pg';

class DbService {
    private static instance: Pool;

    private constructor() {}

    public static getPool(): Pool {
        if (!DbService.instance) {
            DbService.instance = new Pool({
                user: process.env.POSTGRES_USER,
                host: 'otus-highload-db',
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: 5432,
            });
        }
        return DbService.instance;
    }
}

export default DbService;
