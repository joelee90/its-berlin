const express = require('express');
const app = express();
const compression = require('compression');
const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");
const multer = require('multer');
const uidSafe = require('uid-safe');const path = require('path');
const s3 = require('./s3');
const csurf = require('csurf');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: { fileSize: 2097152 } });

app.use(compression());
app.use(express.static('./public'));
app.use(require("body-parser").json());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
// -----------------------------------------------------------------------------

app.get('/welcome', (req,res) => {
    // if(req.session.userId) {
    //     res.redirect('/');
    // } else {
    res.sendFile(__dirname + '/index.html');
    // }
});

//Logout
app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});

//registration
app.post('/form', async (req, res) => {
    const info = req.body.values;
    console.log("info", info);
    try {
        let hash = await bc.hashPassword(info.password);
        let regi = await db.addNewUser(
            info.firstname,
            info.lastname,
            info.email,
            info.phonenumber,
            hash);
        console.log("regi", regi);
        req.session.userId = regi.rows[0].id;
        res.json({ registration : true });
    } catch(err) {
        res.json({ registration : false });
        console.log("err", err);
    }
});

//login
app.post('/login', async (req, res) => {
    const logInfo = req.body.values;
    console.log("logInfo", logInfo);
    try {
        let check = await db.checkEmail(logInfo.email);
        console.log("check.rows[0]", check.rows[0]);
        console.log("check.rows[0].password", check.rows[0].password);

        if(check.rows[0] == 0) {
            res.json({ login : false });
        } else {
            let checkPass = await bc.checkPassword(logInfo.password, check.rows[0].password);
            console.log("checkPass", checkPass);
            if(checkPass) {
                req.session.userId = check.rows[0].id;
                res.json({ login : true });
            } else {
                res.json({ login : false });
            }
        }
    } catch(err) {
        console.log("err", err);
    }
});

app.get('*', function(req, res) {
    if(!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("What's Poppin 😎😎😎😎");
});
