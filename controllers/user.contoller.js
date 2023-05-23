const User = require('../models/User.js')

module.exports.getById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) throw new Error("Invalid ID")
        const result = await User.findById(parseInt(userId))
        res.status(200).send(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}