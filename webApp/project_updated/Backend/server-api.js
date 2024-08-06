import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";
import env from "dotenv";
import cors from "cors";

import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";

import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

import { createProxyMiddleware } from 'http-proxy-middleware'; // To proxy request to file-converter


const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
env.config();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());



/*const allowedOrigins = ["http://localhost:3000", "http://localhost:3002", "http://localhost:3001"];

// Handle CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});*/

app.use(cors());


//app.use(express.static(path.join(__dirname, 'dist')));

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Optional: For development, ensure proper SSL configuration for production
    }
});
db.connect();


const cardData = [
    {
        id: 1,
        heading: "Document Converter",
        details: "Add more details",
    },
    {
        id: 2,
        heading: "Marks Calculator and Visualiser",
        details: "Add more details",
    },
    {
        id: 3,
        heading: "Multiple Categorised Noteooks",
        details: "Add more details",
    },
    {
        id: 4,
        heading: "Calendar",
        details: "Add more details",
    },
    {
        id: 5,
        heading: "Word Counter Tool",
        details: "Add more details",
    },
    {
        id: 6,
        heading: "Customise Tabs and Tools",
        details: "Add more details",
    },

]

const users = [
    {
        username: 'sydney_sweeney@hotmail.com',
        password: 'bigmommymilkers',
        role: 'admin',
    },
];



async function checkTableExist(tableName) {
    const response = await db.query("select exists (select 1 from information_schema.tables where table_name = $1)", [tableName]);
    return response.rows[0].exists;
}

async function createTable() {
    try {
        await db.query('create table users (id serial primary key not null, username varchar(255) not null, password varchar(255) not null, role varchar(255) not null);');
        console.log("users table created");
    } catch (e) {
        console.log(`error creating table : ${e}`);
    }
}

async function createRefreshTokenTable() {
    try {
        await db.query('create table refresh_tokens (id serial primary key not null, user_id int not null, token varchar(255) not null, created_at timestamp default current_timestamp, expires_at timestamp not null, foreign key (user_id) references users(id) on delete cascade);');
        console.log("refresh_tokens table created");
    } catch (e) {
        console.log(`error creating refresh_tokens table : ${e}`);
    }

}

async function hashPassword(text) {
    try {
        const hash = await bcrypt.hash(text, saltRounds);
        return hash;
    } catch (err) {
        console.log(`Error in hashing password: ${err}`);
    }
}

async function insertRecords() {
    try {
        for (let x = 0; x < users.length; x++) {
            const hashedPassword = await hashPassword(users[x].password);
            await db.query(`insert into users (username, password, role) values ($1, $2, $3)`, [users[x].username, hashedPassword, users[x].role]);
        }
        console.log("Successfully inserted records into table");
    } catch (e) {
        console.log(`error inserting data into table users : ${e}`);
    }
}


async function readRecords() {
    try {
        const response = await db.query("select * from users;");
        let records = response.rows;
        console.log(records);
        return records;
    } catch (e) {
        console.log(`error reading records from table : ${e}`);
    }
}

// populating records into database

const tableExists = await checkTableExist("users");
if (!tableExists) {
    console.log("table does not exist, table creating in progess....");
    await createTable();
    await insertRecords();
}

const refreshTokenTable = await checkTableExist("refresh_tokens");
if (!refreshTokenTable) {
    console.log("refresh_token table does not exist, table creating in progress");
    await createRefreshTokenTable();
}


// Checking roles

function checkRole(roles) {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    }
}


async function checkResult(username) {
    const response = await db.query("select exists (select 1 from users where username = $1);", [username]);

    return response.rows[0].exists;

}

async function saveRefreshToken(userId, token, expiresAt) {
    try {
        await db.query("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)", [userId, token, expiresAt]);
    } catch (e) {
        console.log(`Error saving refresh token: ${e}`);
    }
}

async function deleteRefreshToken(token) {
    try {
        await db.query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
    } catch (e) {
        console.log(`Error deleting refresh token: ${e}`);
    }
}

async function deleteExpiredTokens() {
    try {
        await db.query("DELETE FROM refresh_tokens WHERE expires_at < NOW()");
    } catch (e) {
        console.log(`Error deleting expired tokens: ${e}`);
    }
}

// File-Converter endpoints

const docConverterProxy = createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true, // This changeOrigin true option changes the request URL before the path to the target URL as above
});

app.use('/file-converter', passport.authenticate('jwt', { session: false }), docConverterProxy); // Middleware to send request to file-converter

// Note-Taker endpoints

const noteTakerProxy = createProxyMiddleware({
    target: 'http://localhost:3003',
    changeOrigin: true, // This changeOrigin true option changes the request URL before the path to the target URL as above
});

app.use('/note-taker', passport.authenticate('jwt', { session: false }), noteTakerProxy); // Middleware to send request to note-taker



// Server API endpoints

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const recordExists = await checkResult(username);

        if (recordExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password using async/await
        const hash = await bcrypt.hash(password, saltRounds);

        console.log(`username: ${username}, password: ${password}`);
        const result = await db.query(
            "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
            [username, hash, 'user']
        );

        console.log(result);
        return res.status(201).json({ message: "User registered successfully" });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});



app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const recordExists = await checkResult(username);

        if (!recordExists) {
            return res.status(409).json({ message: "User does not exist" });
        }

        // Query the database to find the user
        const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        console.log('Response rows:', response.rows);

        const user = response.rows[0];

        // Ensure user exists
        if (!user) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }

        // Compare the provided password with the hashed password
        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (err) {
                console.log('Error in bcrypt.compare:', err);
                return res.status(401).json({ message: 'Authentication failed' });
            }

            if (!isMatch) {
                console.log('Password does not match');
                return res.status(401).json({ message: "Incorrect username or password" });
            }

            console.log('Authentication successful');
            const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
            await saveRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // 7 days from now
            return res.status(200).json({ accessToken, refreshToken }); // Use return to ensure no further execution
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/api/refreshtoken", async (req, res) => {
    const { refreshToken } = req.body;

    try {
        if (!refreshToken) {
            return res.sendStatus(401); // Unauthorized
        }

        const response = await db.query("SELECT * FROM refresh_tokens WHERE token = $1", [refreshToken]);

        if (response.rows.length === 0) {
            return res.sendStatus(403); //Forbidden
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) {
                await deleteRefreshToken(refreshToken);
                return res.sendStatus(403); // Forbidden
            }

            const newAccessToken = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '30m' });

            return res.json({ accessToken: newAccessToken });


        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        await deleteRefreshToken(refreshToken);
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        await deleteRefreshToken(refreshToken);
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (e) {
        await deleteRefreshToken(refreshToken);
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.get('/api/cardData', passport.authenticate('jwt', { session: false }), checkRole(['user', 'admin']), async (req, res) => {
    //let allProducts = await readRecords();
    res.json(cardData);
});



const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}


passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const response = await db.query("SELECT * FROM users WHERE id = $1", [jwt_payload.id]);
    console.log('Response rows:', response.rows);

    let user;

    if (response.rows.length === 0) {
        console.log("User ID not found");
    } else {
        user = response.rows[0];
        console.log("User found:", user);
    }

    if (user) {
        return done(null, user);
    }
    return done(null, false);
}));


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

