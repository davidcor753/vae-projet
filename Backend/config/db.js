const mysql = require("mysql2");
const config = require("./env");

// Erstellung der Verbindung mit den Daten aus der Konfiguration
const db = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
});

function connectDb() {
    db.connect((dbError) => {
        if (dbError) {
            console.error("Database connection failed:", dbError.message);
            process.exit(1);
        }

        console.log("Connected to the database");
    });
}

// Exportiert somit die Verbindung für den Server und die SQL-Abfragen bereit
module.exports = {
    db,
    connectDb,
};