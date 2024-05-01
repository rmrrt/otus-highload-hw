import DbService from "./DbService";
import {IUserRegisterRequest, UserCreationResponse} from "../types/User";

export default class UserHandler {
    public async register(userRegisterRequest: IUserRegisterRequest): Promise<UserCreationResponse> {
        const pool = DbService.getPool();
        const client = await pool.connect();

        const email = userRegisterRequest.email;

        const userExists = await client.query(`SELECT from users where email = '${email}'`);
        if (userExists.rowCount && userExists.rowCount > 0) {
            return {status: 'ERR', error: 'User already exists'};
        }

        const insertQuery = `INSERT INTO users (first_name, last_name, email, password, birthday, sex, interests, city)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

        await client.query(insertQuery, [userRegisterRequest.first_name, userRegisterRequest.last_name, userRegisterRequest.email, userRegisterRequest.password, userRegisterRequest.birthday, userRegisterRequest.sex, userRegisterRequest.interests, userRegisterRequest.city]);

        return {status: "OK"};
    }
}