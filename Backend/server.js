const express = require("express");
const session = require("express-session");
const config = require("./config/env");
const { connectDb } = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const app = express();

app.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
    }),
);

// Liest die Daten aus HTML-Formularen
app.use(express.urlencoded({ extended: true }));

// Liest die JSON-Daten aus den Anfragen
app.use(express.json());

// Bindet die Routen der Anwendung ein
app.use("/", authRoutes);
app.use("/", usersRoutes);
app.use("/", inventoryRoutes);
// Verbindung für die Anwendung beim Start mit der Datenbank
connectDb();

// Damit startet der Webserver auf dem konfigurierten Port
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});