const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const postNew = (req, res) => {
    if (!req.form['email']) {
        res.status(400).send('Missing email');
    }
    const email = req.form['email'];
}