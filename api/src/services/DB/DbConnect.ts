import { Pool } from 'pg';

class DbConnect {
    private static instance: Pool;

    public static getPool(): Pool {
        if (!DbConnect.instance) {
            DbConnect.instance = new Pool({
                user: process.env.POSTGRES_USER,
                host: 'otus-highload-db',
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: 5432,
            });
        }
        return DbConnect.instance;
    }
}

export default DbConnect;
