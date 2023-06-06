const db = require('../config/postgresdb.js');

class Community {
  constructor({ community_id, community_name, community_summary, community_rules, community_image, community_leader, members, is_default }) {
    this.community_id = community_id;
    this.community_name = community_name;
    this.community_summary = community_summary;
    this.community_rules = community_rules;
    this.community_image = community_image;
    this.community_leader = community_leader;
    this.members = members;
    this.is_default = is_default;
  }

  static async create(community_name, community_summary, community_rules, community_image, community_leader) {
    const query = 'INSERT INTO communities (community_name, community_summary, community_rules, community_image, community_leader) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [community_name, community_summary, community_rules, community_image, community_leader];

    try {
      const { rows } = await db.query(query, values);
      return new Community(rows[0]);
    } catch (error) {
      throw new Error('Error creating post: ' + error.message);
    }
  }

  // static async edit(community_id, content) {
  //   const query = 'UPDATE posts SET content = $1 WHERE post_id = $2 RETURNING *';
  //   const values = [content, community_id];

  //   try {
  //     const { rows } = await db.query(query, values);
  //     return new Community(rows[0]);
  //   } catch (error) {
  //     throw new Error('Error editing post: ' + error.message);
  //   }
  // }

  // static async delete(post_id) {
  //   const query = 'DELETE FROM posts WHERE post_id = $1';
  //   const values = [post_id];

  //   try {
  //     await db.query(query, values);
  //     return true;
  //   } catch (error) {
  //     throw new Error('Error deleting post: ' + error.message);
  //   }
  // }

  static async getAll() {
    const response = await db.query("SELECT * FROM communities;");

    if (response.rows.length === 0) {
        throw new Error ("No communities available");
    }

    return response.rows.map((c) => new Community(c));
  }

  static async getDefault() {
    const response = await db.query("SELECT * FROM communities WHERE is_default = 'true';");

    if (response.rows.length === 0) {
        throw new Error ("No default communities available");
    }

    return response.rows.map((c) => new Community(c));
  }

  static async getByCommunity(community) {
    const query = 'SELECT * FROM communities WHERE community_name = $1';
    const values = [community];

    try {
      const { rows } = await db.query(query, values);
      if (rows[0] === 0) {
        throw new Error('Community not found');
      }
      return new Community(rows[0]);
    } catch (error) {
      throw new Error('Error getting post: ' + error.message);
    }
  }

  static async join(community_id, type) {
    let query;

    switch (type) {
      case "join":
        query =
          "UPDATE communities SET members = members + 1 WHERE community_id = $1 RETURNING *;";
        break;
      case "leave":
        query =
          "UPDATE communities SET members = members - 1 WHERE community_id = $1 RETURNING *;";
        break;
      default:
        break;
    }

    const values = [community_id];

    try {
      const { rows } = await db.query(query, values);
      return new Community(rows[0]);
    } catch (error) {
      throw new Error("Error editing community: " + error.message);
    }
  }
}

module.exports = Community;
