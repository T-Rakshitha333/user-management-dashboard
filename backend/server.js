require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');
const userRoutes = require('./routes/users');


const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
res.json({ status: 'ok', message: 'User Management API' });
});


app.use('/api/users', userRoutes);


app.use((req, res) => res.status(404).json({ error: 'Not found' }));


app.use((err, req, res, next) => {
console.error('Server error:', err);
res.status(500).json({ error: 'Internal server error' });
});


app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
