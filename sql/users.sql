DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    url VARCHAR(600),
    bio text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
