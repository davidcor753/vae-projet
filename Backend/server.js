const express = require("express");
const session = require("express-session");
const path = require("path");
const config = require("./config/env");
const { connectDb } = require("./config/db");
const {
  checkLogin,
  checkAdmin,
  redirectIfLoggedIn,
} = require("./middleware/auth");
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

// Leitet bereits angemeldete Benutzer von der Login-Seite weiter
app.get("/login.html", redirectIfLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/login.html"));
});

// Schützt die Inventarseite vor nicht angemeldeten Benutzern
app.get("/index.html", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// Schützt die Historienseite vor nicht angemeldeten Benutzern
app.get("/consultation.html", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/consultation.html"));
});

// Erlaubt den Zugriff auf die Benutzerverwaltung nur Administratoren
app.get("/users.html", checkLogin, checkAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/users.html"));
});

// Liest die JSON-Daten aus den Anfragen
app.use(express.json());
// Stellt die Dateien aus dem Frontend-Ordner bereit
app.use(express.static(path.join(__dirname, "../Frontend")));
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
