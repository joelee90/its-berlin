var spicedPg = require('spiced-pg');
let db;

if(process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg('postgres:postgres:postgres@localhost:5432/itsberlin');
}

//registration
exports.addNewUser = function addNewUser(firstname, lastname, email, phonenumber, password) {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [ firstname, lastname, email, phonenumber, password ]
    );
};

//login
exports.checkEmail = function checkEmail(email) {
    return db.query(
        `SELECT * FROM users WHERE email = $1 `, [email]
    );
};

//list of all places
exports.showButtonText = function showButtonText(id) {
    return db.query (
        `SELECT * FROM places WHERE place_id = $1`, [id]
    );
};

//update bio - not functioning
exports.updateBio = function updateBio(bio, id) {
    return db.query(
        `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio`,
        [bio, id]
    );
};

//adding place to users
exports.addPlace = function addPlace(sender_id, place_name, place_id) {
    console.log("addPlace sender_id", sender_id);
    console.log("addPlace sender_id", place_name);
    console.log("addPlace sender_id", place_id);
    return db.query (
        `INSERT INTO relations (sender_id, place_name, place_id) VALUES ($1, $2, $3) RETURNING *`,
        [sender_id, place_name, place_id]
    );
};

//removing place to users
exports.removePlace = function removePlace(sender_id, place_name, place_id) {
    console.log("removePlace sender_id", sender_id);
    console.log("addPlace sender_id", place_name);
    console.log("removePlace place_id", place_id);
    return db.query (
        `DELETE FROM relations WHERE (sender_id=$1 AND place_id=$2)`,
        [sender_id, place_id]
    );
};

//get list of updated places
exports.getUpdatedPlaces = function getUpdatedPlaces(id) {
    return db.query (
        `SELECT * FROM relations WHERE sender_id = $1`,
        [id]
    );
};

//add users image
exports.addUserImage = function addUserImage(url, id) {
    return db.query(
        `UPDATE users SET url = $1 WHERE id = $2 RETURNING url`,
        [ url, id ]
    );
};

//get users' information
exports.getUserById = function getUserById(id) {
    return db.query (
        `SELECT id, firstname, lastname, url, bio FROM users WHERE id=$1`, [id]);
};

//chat save message
exports.saveMessages = function saveMessages(sender_id, message) {
    return db.query (
        `
        INSERT INTO chats (sender_id, message) VALUES ($1, $2) RETURNING *
        `, [sender_id, message]
    );
};

//chat bring last messages
exports.getLastTenMessages = function getLastTenMessages() {
    return db.query (
        `
        SELECT chats.id, sender_id, chats.message, chats.created_at, users.firstname, users.lastname, users.url
        FROM chats
        LEFT JOIN users
        ON users.id = chats.sender_id
        ORDER BY chats.created_at DESC
        LIMIT 20
        `
    );
};
