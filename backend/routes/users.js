const express = require('express');
const db = require('../database');
const router = express.Router();


function mapUser(row) {
if (!row) return null;
const { id, name, email, phone, company, street, city, zipcode, lat, lng, created_at, updated_at } = row;
return { id, name, email, phone, company, street, city, zipcode, lat, lng, created_at, updated_at };
}


// GET /api/users
router.get('/', (req, res) => {
const q = req.query.q;
if (q) {
const sql = 'SELECT * FROM users WHERE name LIKE ? OR email LIKE ? ORDER BY id DESC';
const param = `%${q}%`;
db.all(sql, [param, param], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
return res.json({ data: rows.map(mapUser) });
});
} else {
db.all('SELECT * FROM users ORDER BY id DESC', [], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json({ data: rows.map(mapUser) });
});
}
});


// GET /api/users/:id
router.get('/:id', (req, res) => {
db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
if (err) return res.status(500).json({ error: err.message });
if (!row) return res.status(404).json({ error: 'User not found' });
res.json({ data: mapUser(row) });
});
});


// POST /api/users
router.post('/', (req, res) => {
const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
if (!name || !email) return res.status(400).json({ error: 'Name and email required' });


const sql = `INSERT INTO users (name,email,phone,company,street,city,zipcode,lat,lng) VALUES (?,?,?,?,?,?,?,?,?)`;
const params = [name, email, phone || null, company || null, street || null, city || null, zipcode || null, lat || null, lng || null];


db.run(sql, params, function (err) {
if (err) return res.status(400).json({ error: err.message });
db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err2, row) => {
if (err2) return res.status(500).json({ error: err2.message });
res.status(201).json({ data: mapUser(row) });
});
});



// PUT /api/users/:id
router.put('/:id', (req, res) => {
const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
if (!name || !email) return res.status(400).json({ error: 'Name and email required' });


const sql = `UPDATE users SET name=?,email=?,phone=?,company=?,street=?,city=?,zipcode=?,lat=?,lng=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`;
const params = [name, email, phone || null, company || null, street || null, city || null, zipcode || null, lat || null, lng || null, req.params.id];


db.run(sql, params, function (err) {
module.exports = router;
