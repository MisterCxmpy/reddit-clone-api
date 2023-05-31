const Posts = require('../models/Posts');

module.exports.createPost = async (req, res, next) => {
  const { community, author, title, content, user_id } = req.body;

  try {
    const post = await Posts.create(community, author, title, content, user_id);
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.editPost = async (req, res, next) => {
  const { post_id } = req.params;
  const { content } = req.body;

  try {
    const post = await Posts.edit(post_id, content);
    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.editVote = async (req, res, next) => {
  const { id } = req.params;
  const { vote_type } = req.body;

  try {
    const post = await Posts.vote(id, vote_type);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.editPost = async (req, res, next) => {
  const { post_id } = req.params;
  const { vote_type } = req.body;

  try {
    const post = await Posts.vote(post_id, vote_type);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deletePost = async (req, res, next) => {
  const { post_id } = req.params;

  try {
    await Posts.delete(post_id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Posts.getById(id);
    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getPostByCommunity = async (req, res, next) => {
  const { community } = req.params;

  try {
    const post = await Posts.getByCommunity(community);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
