const express = require("express");
const config = require("./config/env");
const { connectDb } = require("./config/db");

const app = express();

// Verbindung für die Anwendung beim Start mit der Datenbank
connectDb();

// Damit startet der Webserver auf dem konfigurierten Port
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});