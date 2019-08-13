DROP TABLE IF EXISTS places;
CREATE TABLE places(
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(600),
    place_id VARCHAR(600),
    placeurl VARCHAR(600),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
