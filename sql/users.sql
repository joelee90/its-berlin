DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phonenumber VARCHAR,
    password VARCHAR,
    url VARCHAR(600),
    bio text,    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
