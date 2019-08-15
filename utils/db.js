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
//old
// exports.addPlace = function addPlace(sender_id, place_id) {
//     console.log("addPlace sender_id", sender_id);
//     console.log("addPlace sender_id", place_id);
//     return db.query (
//         `UPDATE places SET sender_id = $1 WHERE place_id = $2 RETURNING sender_id`,
//         [sender_id, place_id]
//     );
// };
//new
exports.addPlace = function addPlace(sender_id, place_name, place_id) {
    console.log("addPlace sender_id", sender_id);
    console.log("addPlace sender_id", place_name);
    console.log("addPlace sender_id", place_id);
    return db.query (
        `INSERT INTO relations (sender_id, place_name, place_id) VALUES ($1, $2, $3) RETURNING *`,
        [sender_id, place_name, place_id]
    );
};

//new
exports.removePlace = function removePlace(sender_id, place_name, place_id) {
    console.log("removePlace sender_id", sender_id);
    console.log("addPlace sender_id", place_name);
    console.log("removePlace place_id", place_id);
    return db.query (
        `DELETE FROM relations WHERE (sender_id=$1 AND place_id=$2)`,
        [sender_id, place_id]
    );
};
//old
// exports.removePlace = function removePlace(place_id) {
//     console.log("removePlace place_id", place_id);
//     return db.query (
//         `
//         UPDATE places SET sender_id = null WHERE place_id = $1 RETURNING sender_id`,
//         [place_id]
//     );
// };

//get list of updated places
exports.getUpdatedPlaces = function getUpdatedPlaces(id) {
    return db.query (
        `SELECT * FROM relations WHERE sender_id = $1`,
        [id]
    );
};

exports.addUserImage = function addUserImage(url, id) {
    return db.query(
        `UPDATE users SET url = $1 WHERE id = $2 RETURNING url`,
        [ url, id ]
    );
};


exports.saveMessages = function saveMessages(sender_id, message) {
    return db.query (
        `
        INSERT INTO chats (sender_id, message) VALUES ($1, $2) RETURNING *
        `, [sender_id, message]
    );
};

exports.getLastTenMessages = function getLastTenMessages() {
    return db.query (
        `
        SELECT chats.id, sender_id, chats.message, chats.created_at, information.firstname, information.lastname, information.url
        FROM chats
        LEFT JOIN information
        ON information.id = chats.sender_id
        ORDER BY chats.created_at DESC
        LIMIT 10
        `
    );
};

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
