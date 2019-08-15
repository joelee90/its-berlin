DROP TABLE IF EXISTS relations;
CREATE TABLE relations(
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(600),
    place_name VARCHAR(600),
    place_id VARCHAR(600),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
