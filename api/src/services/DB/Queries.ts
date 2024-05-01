export const createTable = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name VARCHAR NOT NULL, last_name VARCHAR NOT NULL, email VARCHAR NOT NULL, password VARCHAR NOT NULL, birthday DATE NOT NULL, city VARCHAR NOT NULL, interests VARCHAR NOT NULL, sex VARCHAR NOT NULL)";

export const createUser =  `INSERT INTO users (first_name, last_name, email, password, birthday, sex, interests, city)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

export const getUser =  `SELECT * FROM users WHERE id = $1`;

export const getUserByEmail = "SELECT * FROM users WHERE email = $1";