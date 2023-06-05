const User = require("../models/User.js");

module.exports.getById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) throw new Error("Invalid ID");
    const result = await User.findById(parseInt(userId));
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.setVote = async (req, res, next) => {
  const { id } = req.params
  const { post_id, post_name, vote_type } = req.body;

  try {
    const vote = await User.vote(id, post_id, post_name, vote_type);
    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
