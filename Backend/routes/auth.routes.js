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
});


module.exports = router;
