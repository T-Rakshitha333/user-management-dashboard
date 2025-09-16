// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database.js');

// GET all users
router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// CREATE user
router.post("/", (req, res) => {
  const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
  const sql = `INSERT INTO users (name, email, phone, company, street, city, zipcode, lat, lng)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [name, email, phone || null, company || null, street || null, city || null, zipcode || null, lat || null, lng || null];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, ...req.body });
  });
});

// UPDATE user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;

  const sql = `UPDATE users
               SET name = ?, email = ?, phone = ?, company = ?, street = ?, city = ?, zipcode = ?, lat = ?, lng = ?
               WHERE id = ?`;
  const params = [name, email, phone || null, company || null, street || null, city || null, zipcode || null, lat || null, lng || null, id];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ updatedID: id, changes: this.changes });
  });
});

// DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id, changes: this.changes });
  });
});

module.exports = router;
