const express = require("express");
const { db } = require("../config/db");
const { checkLogin } = require("../middleware/auth");

const router = express.Router();

// Speichert eine Inventar-Aktion in der Historie
function logInventoryAction(itemId, actionType, req) {
  const sql = `
        INSERT INTO inventaire_actions
        (item_id, action_type, actor_user_id, actor_username)
        VALUES (?, ?, ?, ?)
    `;

  db.query(
    sql,
    [itemId, actionType, req.session.user.id, req.session.user.name],
    (dbError) => {
      if (dbError) {
        console.error("Inventory log error:", dbError);
      }
    },
  );
}

// Lädt alle Geräte mit Kategorie und Standort
router.get("/inventory", checkLogin, (req, res) => {
  const sql = `
        SELECT
            items.id,
            items.name,
            items.serial_number,
            items.category_id,
            items.location_id,
            category.name AS category,
            locations.name AS location,
            items.status,
            items.description
        FROM items
        LEFT JOIN category
            ON items.category_id = category.id
        LEFT JOIN locations
            ON items.location_id = locations.id
        ORDER BY items.id DESC
    `;

  db.query(sql, (dbError, itemRows) => {
    if (dbError) {
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(itemRows);
  });
});

// Lädt die Historie der Inventar-Aktionen
router.get("/inventory/actions", checkLogin, (req, res) => {
  const sql = `
        SELECT
            id,
            item_id,
            action_type,
            actor_user_id,
            actor_username,
            created_at
        FROM inventaire_actions
        ORDER BY created_at DESC
    `;

  db.query(sql, (dbError, actionRows) => {
    if (dbError) {
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(actionRows);
  });
});

// Erstellt ein neues Gerät
router.post("/inventory", checkLogin, (req, res) => {
  const name = req.body.name;
  const serialNumber = req.body.serial_number;
  const categoryId = req.body.category_id;
  const locationId = req.body.location_id;
  const status = req.body.status || "En Stock";
  const description = req.body.description;

  if (!name || !serialNumber || !categoryId || !locationId) {
    return res.status(400).json({
      error: "Bitte füllen Sie die erforderlichen Felder aus.",
    });
  }

  const sql = `
        INSERT INTO items
        (name, serial_number, category_id, location_id, status, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [name, serialNumber, categoryId, locationId, status, description],
    (dbError, result) => {
      if (dbError) {
        console.error("POST /inventory database error:", dbError);

        if (dbError.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            error: "Diese Seriennummer existiert bereits.",
          });
        }

        return res.status(500).json({
          error: "Database error",
        });
      }

      logInventoryAction(result.insertId, "create", req);

      return res.json({ success: true });
    },
  );
});

// Aktualisiert ein bestehendes Gerät über seine ID
router.put("/inventory/:id", checkLogin, (req, res) => {
  const id = req.params.id;

  const name = req.body.name;
  const serialNumber = req.body.serial_number;
  const categoryId = req.body.category_id;
  const locationId = req.body.location_id;
  const status = req.body.status;
  const description = req.body.description;

  if (!name || !serialNumber || !categoryId || !locationId || !status) {
    return res.status(400).json({
      error: "Bitte füllen Sie die erforderlichen Felder aus.",
    });
  }

  const sql = `
        UPDATE items
        SET name = ?,
            serial_number = ?,
            category_id = ?,
            location_id = ?,
            status = ?,
            description = ?
        WHERE id = ?
    `;

  db.query(
    sql,
    [name, serialNumber, categoryId, locationId, status, description, id],
    (dbError) => {
      if (dbError) {
        if (dbError.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            error: "Diese Seriennummer existiert bereits.",
          });
        }

        return res.status(500).json({
          error: "Database error",
        });
      }

      logInventoryAction(id, "update", req);

      return res.json({ success: true });
    },
  );
});

// Löscht ein Gerät über die ID
router.delete("/inventory/:id", checkLogin, (req, res) => {
  const id = req.params.id;

  logInventoryAction(id, "delete", req);

  const sql = "DELETE FROM items WHERE id = ?";

  db.query(sql, [id], (dbError) => {
    if (dbError) {
      return res.status(500).json({
        error: "Database error",
      });
    }

    return res.json({ success: true });
  });
});

// Lädt die Anzahl der Geräte pro Status
router.get("/inventory/statistics", checkLogin, (req, res) => {
  const sql = `
    SELECT status, COUNT(*) AS anzahl
    FROM items
    GROUP BY status
  `;

  db.query(sql, (dbError, rows) => {
    if (dbError) {
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(rows);
  });
});

module.exports = router;
