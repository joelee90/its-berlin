DROP TABLE IF EXISTS chats;
CREATE TABLE chats(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES information(id),
    message VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
