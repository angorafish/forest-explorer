const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password_hash: hashedPassword });
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up user' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
});

module.exports = router;
