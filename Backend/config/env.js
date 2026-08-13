// Lädt die Umgebungsvariablen aus der .env-Datei
require("dotenv").config(); // .env Datei

const config = {
    // Allgemeine Serverkonfiguration
    port: Number(process.env.PORT || 3000),
    
    nodeEnv: process.env.NODE_ENV || "development",
    
    sessionSecret: process.env.SESSION_SECRET || "secret",
    // Zugangsdaten für die MySQL-Datenbank
   
    dbHost: process.env.DB_HOST || "localhost",
    
    dbUser: process.env.DB_USER || "root",
    
    dbPassword: process.env.DB_PASSWORD || "",
    
    dbName: process.env.DB_NAME || "inventaire",
};
// Stellt die Konfiguration für andere Backend-Dateien bereit
module.exports = config;