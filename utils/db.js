var spicedPg = require('spiced-pg');
let db;

if(process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg('postgres:postgres:postgres@localhost:5432/itsberlin');
}

exports.addNewUser = function addNewUser(firstname, lastname, email, phonenumber, password) {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [ firstname, lastname, email, phonenumber, password ]
    );
};

// exports.addUserIdIntoPlaceId = function addUserIdIntoPlaceId(id) {
//     return db.query(
//         `INSERT INTO places (sender_id)`,
//         [id]
//     );
// };
// let regiPlaces = await db.addUserIdIntoPlaceId(req.session.userId);

exports.checkEmail = function checkEmail(email) {
    return db.query(
        `SELECT * FROM users WHERE email = $1 `, [email]
    );
};

exports.showButtonText = function showButtonText(id) {
    return db.query (
        `SELECT * FROM places WHERE place_id = $1`, [id]
    );
};

exports.updateBio = function updateBio(bio, id) {
    return db.query(
        `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio`,
        [bio, id]
    );
};

exports.addPlace = function addPlace(sender_id, place_id) {
    return db.query (
        `UPDATE places SET sender_id = $1 WHERE place_id = $2 RETURNING sender_id`,
        [sender_id, place_id]
    );
};

exports.removePlace = function removePlace(sender_id, place_id) {
    return db.query (
        `
        DELETE from places WHERE (sender_id = $1 and place_id = $2)`,
        [sender_id, place_id]
    );
};

//merge TABLE



// exports.savePlaceApi = function savePlaceApi(place_id) {
//     return db.query(
//         `INSERT INTO users (place_id) VALUES ($1)`,
//         [place_id]
//     );
// };



// exports.checkVisited = function checkVisited(sender_id, place_id) {
//     return db.query (
//         `
//         INSERT INTO places (sender_id, place_id) VALUES ($1, $2) RETURNING id`,
//         [sender_id, place_id]
//     );
// };

// exports.changePlaceT = function changePlaceT(sender_id, place_id) {
//     return db.query (
//         `UPDATE users SET accepted=true WHERE (sender_id = $1 AND place_id = $2) RETURNING *`,
//         [sender_id, place_id]
//     );
// };
//
//
// exports.changePlaceF = function changePlaceF(sender_id, place_id) {
//     return db.query (
//         `UPDATE users SET accepted=false WHERE (sender_id = $1 AND place_id = $2) RETURNING *`,
//         [sender_id, place_id]
//     );
// };
