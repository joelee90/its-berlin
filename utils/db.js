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

exports.checkEmail = function checkEmail(email) {
    return db.query(
        `SELECT * FROM users WHERE email = $1 `, [email]
    );
};

exports.updateBio = function updateBio(bio, id) {
    return db.query(
        `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio`,
        [bio, id]
    );
};
