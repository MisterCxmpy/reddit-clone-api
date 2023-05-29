const Vote = require("../models/Vote.js");

module.exports.createVote = async (req, res, next) => {
  const { user_id, post_id, vote_type } = req.body;

  console.log(req.body)

  try {
    const vote = await Vote.create(user_id, post_id, vote_type);
    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getLikesByUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const vote = await Vote.getLikesByUser(id);
    res.json(vote);
  } catch (error) {
    res.status(500).json([]);
  }
};
