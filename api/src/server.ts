import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import DbService from "./services/DbService";

const app = Fastify({
    logger: true
});

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
});

app.get('/self-test', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        return { status: "OK" };
    } catch (error) {
        reply.code(500).send({ error: 'Database connection error' });
    }
});

const start = async () => {
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });

        const pool = DbService.getPool();
        const client = await pool.connect();
        await client.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name VARCHAR NOT NULL, last_name VARCHAR NOT NULL, email VARCHAR NOT NULL, password VARCHAR NOT NULL, birthday DATE NOT NULL, city VARCHAR NOT NULL, interests VARCHAR NOT NULL, sex VARCHAR NOT NULL)");
        client.release();

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start().then(r => console.log('Server is running, database connected.'));
