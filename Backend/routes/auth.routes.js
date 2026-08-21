const express = require("express");
const bcrypt = require("bcrypt");
const { db } = require("../config/db");

const router = express.Router();
// die Anmeldung eines Benutzers wird verarbeitet
router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
 // Prüft, ob Benutzername und Passwort angegeben wurden
    if (!username || !password) {
        return res.status(400).send("Fields are missing");
    }
// Sucht den Benutzer anhand seines Namens in der Datenbank
    const sql = "SELECT * FROM users WHERE name = ?";

    db.query(sql, [username], (dbError, userRows) => {
        if (dbError) {
            return next(dbError);
        }

        if (userRows.length === 0) {
            return res.status(401).send("Login is not possible");
        }

        const userFromDb = userRows[0];
// Vergleicht das eingegebene Passwort mit dem gespeicherten Hash
        bcrypt.compare(
            password,
            userFromDb.password,
            (bcryptError, passwordIsCorrect) => {
                if (bcryptError) {
                    return next(bcryptError);
                }

                if (!passwordIsCorrect) {
                    return res.status(401).send("Login is not possible");
                }
  // Speichert den angemeldeten Benutzer in der Session
                req.session.user = {
                    id: userFromDb.id,
                    name: userFromDb.name,
                    role: userFromDb.role,
                };

                return res.redirect("/index.html");
            },
        );
    });
});

// Gibt die Information mit dem aktuell angemeldeten Benutzer aus der Session zurück
router.get("/api/whoami", (req, res) => {
    if (!req.session.user) {
        return res.json({ role: "not allowed" });
    }

    return res.json(req.session.user);
});

// Meldet den Benutzer ab und beendet die Session
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login.html");
    });
});

module.exports = router;