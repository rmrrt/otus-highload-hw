import Fastify, {FastifyReply, FastifyRequest} from 'fastify';
import cors from '@fastify/cors';
import { AddressInfo } from 'net';

// Create a Fastify instance
const app = Fastify({
    logger: true
});

// Register CORS plugin
app.register(cors, {
    // Configure CORS as needed
    origin: "*", // Allowing all origins for simplicity; adjust as needed for security
    methods: ["GET", "POST", "PUT", "DELETE"]
});

// Define the '/self-test' route
app.get('/self-test', async (request: FastifyRequest, reply: FastifyReply) => {
    return { status: "OK aaassdas" };
});

// Run the server!
const start = async () => {
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });
        const address = app.server.address();
        if (typeof address === 'string') {
            app.log.info(`server listening on ${address}`);
        } else if (address && typeof address === 'object') {
            app.log.info(`server listening on ${address.address}:${address.port}`);
        }
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
start().then(() => {
    console.log("Server is running at port 3000");
});
