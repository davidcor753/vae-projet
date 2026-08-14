const express = require("express");
const session = require("express-session");
const config = require("./config/env");
const { connectDb } = require("./config/db");

const app = express();

app.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
    }),
);
// Verbindung für die Anwendung beim Start mit der Datenbank
connectDb();

// Damit startet der Webserver auf dem konfigurierten Port
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});