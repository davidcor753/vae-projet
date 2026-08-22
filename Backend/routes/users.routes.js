const express = require("express");
const { db } = require("../config/db");
const { checkLogin, checkAdmin } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const router = express.Router();

// Ruft alle Benutzer mit ID, Name und Rolle ab
router.get("/users", checkLogin, checkAdmin, (req, res) => {
    const sql = "SELECT id, name, role FROM users ORDER BY id DESC";

    db.query(sql, (dbError, userRows) => {
        if (dbError) {
            return res.status(500).json({ error: "Database error" });
        }

        return res.json(userRows);
    });
});
// Erstellt einen neuen Benutzer
router.post("/users", checkLogin, checkAdmin, (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const role = req.body.role;

  if (!name || !password || !role) {
    return res.status(400).json({ error: "Bitte füllen Sie alle erforderlichen Felder aus." });
  }

  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ error: "Invalid role" });
  }
  bcrypt.hash(password, 10, (bcryptError, hashedPassword) => {
    if (bcryptError) {
      return res.status(500).json({ error: "Password hash error" });
    }

    const sql = "INSERT INTO users (name, password, role) VALUES (?, ?, ?)";
    db.query(sql, [name, hashedPassword, role], (dbError) => {
      if (dbError) {
        return res.status(500).json({ error: "Database error" });
      }

      return res.json({ success: true });
    });
  });
});


// Ändert die Rolle des Benutzers mit der ID
router.put("/users/:id", checkLogin, checkAdmin, (req, res) => {
    const id = req.params.id;
    const role = req.body.role;

    if (role !== "admin" && role !== "user") {
        return res.status(400).json({ error: "Ungültige Benutzerrolle" });
    }

    const sql = "UPDATE users SET role = ? WHERE id = ?";

    db.query(sql, [role, id], (dbError) => {
        if (dbError) {
            return res.status(500).json({ error: "Database error" });
        }

        return res.json({ success: true });
    });
});
// Löscht einen Benutzer mit der ID
router.delete("/users/:id", checkLogin, checkAdmin, (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (dbError) => {
        if (dbError) {
            return res.status(500).json({ error: "Database error" });
        }

        return res.json({ success: true });
    });
});
module.exports = router;