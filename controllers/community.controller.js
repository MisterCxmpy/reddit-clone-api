const Community = require("../models/Community");

module.exports.createPost = async (req, res, next) => {
  const { community_name, community_summary, community_rules, community_image, community_leader } = req.body;

  try {
    const community = await Community.create(community_name, community_summary, community_rules, community_image, community_leader);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCommunityByCommunity = async (req, res, next) => {
  const { community } = req.params;

  try {
    const community_info = await Community.getByCommunity(community);
    res.json(community_info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const community = await Community.getAll();
    res.json({ community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getDefault = async (req, res, next) => {
  try {
    const community = await Community.getDefault();
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};