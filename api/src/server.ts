import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import DbConnect from "./services/DB/DbConnect";
import {IUserRegisterRequest, UserGetRequest, UserLoginRequest} from "./types/User";
import UserHandler from "./services/UserHandler";
import {createTable} from "./services/DB/Queries";
import * as repl from "node:repl";

const app = Fastify({
    logger: true
});

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
});

app.get('/self-test', async () => {
    return { status: "OK" };
});

app.post('/user/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = <IUserRegisterRequest>request.body;
    const userHandler = new UserHandler();
    const result = await userHandler.register(body);
    reply.code(200).send(result);
})

app.get('/user/get/:userId', async (request, reply) => {
    const params = <UserGetRequest>request.params;
    const userHandler = new UserHandler();
    const user = await userHandler.getById(params);
    reply.code(200).send(user);
});

app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const userHandler = new UserHandler();
    const body = <UserLoginRequest>request.body;
    const user = await userHandler.login(body);
    reply.code(200).send(user);
})

const start = async () => {
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });

        const pool = DbConnect.getPool();
        const client = await pool.connect();
        await client.query(createTable);
        client.release();

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start().then(r => console.log('Server is running, database connected.'));
