const express = require("express");
const bcrypt = require("bcrypt");
const { db } = require("../config/db");

const router = express.Router();

router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send("Fields are missing");
    }

    const sql = "SELECT * FROM users WHERE name = ?";

    db.query(sql, [username], (dbError, userRows) => {
        if (dbError) {
            return next(dbError);
        }

        if (userRows.length === 0) {
            return res.status(401).send("Login is not possible");
        }

        const userFromDb = userRows[0];

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

module.exports = router;