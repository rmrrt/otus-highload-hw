import DbConnect from "./DB/DbConnect";
import {
    IUserRegisterRequest,
    UserCreationResponse,
    UserGetRequest,
    UserGetResponse,
    UserGetResponseError, UserLoginRequest
} from "../types/User";
import {createUser, getUser, getUserByEmail} from "./DB/Queries";
import Crypt from "./Crypt";

export default class UserHandler {
    public async register(userRegisterRequest: IUserRegisterRequest): Promise<UserCreationResponse> {
        const pool = DbConnect.getPool();
        const client = await pool.connect();

        const email = userRegisterRequest.email;

        const userExists = await client.query(`SELECT from users where email = '${email}'`);
        if (userExists.rowCount && userExists.rowCount > 0) {
            return {status: 'ERR', error: 'User already exists'};
        }
        const hashedPassword = await Crypt.hashPassword(userRegisterRequest.password);
        await client.query(createUser, [userRegisterRequest.first_name, userRegisterRequest.last_name, userRegisterRequest.email, hashedPassword, userRegisterRequest.birthday, userRegisterRequest.sex, userRegisterRequest.interests, userRegisterRequest.city]);
        client.release();
        return {status: "OK"};
    }

    public async getById(userGetRequest: UserGetRequest): Promise<UserGetResponse | UserGetResponseError> {
        const pool = DbConnect.getPool();
        const client = await pool.connect();
        const user = await client.query(getUser, [userGetRequest.userId]);
        if (user.rowCount && user.rowCount > 0) {
            client.release();
            return <UserGetResponse>user.rows[0];
        }

        client.release();
        return {error: 'User not found'};
    }

    public async login(userLoginRequest: UserLoginRequest): Promise<UserGetResponse | UserGetResponseError> {

        const pool = DbConnect.getPool();
        const client = await pool.connect();
        const user = await client.query(getUserByEmail, [userLoginRequest.email]);

        if (user.rowCount && user.rowCount > 0) {
            client.release();
            const userPasswordInDb = user.rows[0].password;

            const isPasswordValid = await Crypt.verifyPassword(userLoginRequest.password, userPasswordInDb);

            if (isPasswordValid) {
                return <UserGetResponse>user.rows[0];
            }
            return {error: "Login info invalid"};
        }

        return {error: "Login info invalid, no user found"};
    }
}