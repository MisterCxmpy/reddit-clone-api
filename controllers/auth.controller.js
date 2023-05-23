const User = require('../models/User.js');

module.exports.register = async (req, res) => {
    if (!req.body.email || !req.body.username || !req.body.password) return res.status(422).json({ message: 'Incorrect Input' });

    try {
        const user = await User.create(req.body);

        res.status(201).json({ ...user, password: null });
    } catch (error) {
        if(error.code == 23505) return res.status(422).json({ message: 'User already exists' })
        res.status(422).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password) return res.status(422).json({ message: 'Incorrect Input' });
    try {
        const user = await User.findByUsername(req.body.username)

        if (await User.comparePassword(req.body.password, user.password)) res.status(200).json({ ...user, password: null })
        else res.status(401).json({ error: 'Incorrect Password' });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} 