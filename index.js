const express = require('express');
const app = express();
const compression = require('compression');
const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const csurf = require('csurf');
const config = require('./config');
const server = require('http').Server(app);
const io = require('socket.io')(server, {origins: "localhost:8080"});
const moment = require("moment");


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
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
    if(req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
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

//Profile
app.post('/profile', async (req, res) => {
    const userBio = req.body.bio;
    // console.log("req.body.bio", req.body.bio);
    try {
        await db.updateBio(userBio, req.session.userId);
        res.json({ userBio });
    } catch (err) {
        console.log("err in post profile", err);
    }
});

//saving HereApi in db
// app.post('/saveFourApi', async (req, res) => {
//     try {
//         await db.savePlaceApi(req.id);
//     } catch (err){
//         console.log("err", err);
//     }
// });

//check visitied
app.post('/checkVisited', async (req, res) => {
    try {
        // console.log("req.body.button checkvisited", req.body.button);
        // console.log("req.body checkvisited", req.body);
        const placeId = req.body.id;
        // console.log("placeId", placeId);
        // console.log("req.body.name", req.body.name);
        // console.log("req.body", req.body);
        // console.log("req.body.button", req.body.button);
        const showButton = await db.showButtonText(req.body.id);
        // console.log("showButton", showButton.rows);
        if(showButton.rows) {
            res.json({
                buttonText: "Add"
            });
        } else if(showButton.rows == 0) {
            res.json({
                buttonText: "Cancel"
            });
        }
    } catch (err) {
        console.log("err in get checkVisited", err);
    }
});

app.post('/changePlaceStatus', async (req, res) => {
    const sender = req.session.userId;
    // console.log("sender", sender);
    const placeId = req.body.id;
    // console.log("placeId", placeId);
    const buttonStatus = req.body.button;
    // console.log("req.body.button changeplace" , req.body.button);
    // console.log("req.body", req.body);
    const name = req.body.name;
    try {
        if(buttonStatus == 'ADD') {
            const addingPlace = await db.addPlace(sender, name, placeId);
            // console.log("addingPlace", addingPlace);
            res.json({
                buttonText: "DELETE"
            });
        } if(buttonStatus == 'DELETE') {
            const rmvPlace = await db.removePlace(sender, name, placeId);
            // console.log("rmvPlace", rmvPlace);
            // console.log("sender", sender);
            // console.log("placeId", placeId);
            res.json({
                buttonText: "ADD"
            });
        }
    } catch (err) {
        console.log("err in in changePlaceStatus", err);
    }
});


//get list of updated places
app.get('/updatedplaces', async (req, res) => {
    try {
        const data = await db.getUpdatedPlaces(req.session.userId);
        // console.log("list from updatedplaces", data);
        res.json(data);
    } catch(err) {
        console.log("err in updatedplaces", err);
    }
});

//getting google places
// app.get("/searchinfo", function(req, res) {
//     let url =
//         "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.520008,13.404954&language=en&radius=5000&keyword=things%20to%20do%20in%20Berlin&rankby=prominence&key=AIzaSyC_1b_D0SpU6lX1j6NDkIf0iDsA9ZQujyU";
//     app.get(url).then(({ data }) => {
//         res.json(data);
//     });
// });

app.get('*', function(req, res) {
    if(!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


io.on('connection', async function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    // onLineUsers[socket.id] = socket.request.session.userId;
    //online user, check that id is on the list once. then emit event about user appearance.
    let userId = socket.request.session.userId;
    console.log("userId connection", userId);
    let socketId = socket.id;

    if (!userId) {
        return socket.disconnect(true);
    }

    const latestMsg = await db.getLastTenMessages();
    // console.log("latestMsg", latestMsg.rows);
    latestMsg.rows.forEach(val => {
        val.created_at = moment(val.created_at, moment.ISO_8601).fromNow();
    });
    io.emit('chatMessages', latestMsg.rows.reverse());

    socket.on('Send chat', async (data) => {
        let newMsg = await db.saveMessages(userId, data);
        let user = await db.getUserById(userId);
        // console.log("data from chat.js", data);
        // console.log("newMsg.rows", newMsg.rows);
        // console.log("user", user.rows);
        newMsg.rows[0].created_at = moment(
            newMsg.rows[0].created_at,
            moment.ISO_8601
        ).fromNow();

        const result = {...newMsg.rows[0], ...user.rows[0]};
        // console.log("results", result);
        io.emit('newChatMessage', result);
    });

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});

server.listen(8080, function() {
    console.log("What's Poppin 😎😎😎😎");
});
