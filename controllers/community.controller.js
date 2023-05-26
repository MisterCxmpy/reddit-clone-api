const Community = require("../models/Community");

module.exports.getCommunityById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const community = await Community.getById(id);
    res.json({ community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const community = await Community.getAll();
    console.log(community)
    res.json({ community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};