DROP TABLE IF EXISTS relations;
CREATE TABLE relations(
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(600),
    place_id VARCHAR(600),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
