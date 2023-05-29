const db = require("../config/postgresdb.js");

class Post {
  constructor({
    post_id,
    community,
    author,
    created_at,
    title,
    content,
    upvotes,
    downvotes,
    comments,
    user_id,
  }) {
    this.post_id = post_id;
    this.community = community;
    this.author = author;
    this.created_at = created_at;
    this.title = title;
    this.content = content;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
    this.comments = comments;
    this.user_id = user_id;
  }

  static async create(community, author, title, content, user_id) {
    const query =
      "INSERT INTO posts (community, author, title, content, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [community, author, title, content, user_id];

    try {
      const { rows } = await db.query(query, values);
      return new Post(rows[0]);
    } catch (error) {
      throw new Error("Error creating post: " + error.message);
    }
  }

  static async edit(post_id, content) {
    const query =
      "UPDATE posts SET content = $1 WHERE post_id = $2 RETURNING *";
    const values = [content, post_id];

    try {
      const { rows } = await db.query(query, values);
      return new Post(rows[0]);
    } catch (error) {
      throw new Error("Error editing post: " + error.message);
    }
  }

  static async vote(post_id, vote_type) {
    let query;

    switch (vote_type) {
      case "upvote":
        query =
          "UPDATE posts SET upvotes = upvotes + 1 WHERE post_id = $1 RETURNING *;";
        break;
      case "downvote":
        query =
          "UPDATE posts SET downvotes = downvotes + 1 WHERE post_id = $1 RETURNING *;";
        break;
      default:
        break;
    }

    const values = [post_id];

    try {
      const { rows } = await db.query(query, values);
      return new Post(rows[0]);
    } catch (error) {
      throw new Error("Error editing post: " + error.message);
    }
  }

  static async delete(post_id) {
    const query = "DELETE FROM posts WHERE post_id = $1";
    const values = [post_id];

    try {
      await db.query(query, values);
      return true;
    } catch (error) {
      throw new Error("Error deleting post: " + error.message);
    }
  }

  static async getById(post_id) {
    const query = "SELECT * FROM posts WHERE post_id = $1";
    const values = [post_id];

    try {
      const { rows } = await db.query(query, values);
      if (rows[0] === 0) {
        throw new Error("Post not found");
      }
      return new Post(rows[0]);
    } catch (error) {
      throw new Error("Error getting post: " + error.message);
    }
  }

  static async getByCommunity(community) {
    const query = "SELECT * FROM posts WHERE community = $1";
    const values = [community];

    try {
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error("No posts available");
      }
      return rows.map((c) => new Post(c));
    } catch (error) {
      throw new Error("Error getting post: " + error.message);
    }
  }
}

module.exports = Post;
