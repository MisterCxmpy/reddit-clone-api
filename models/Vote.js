const db = require('../config/postgresdb.js');

class Vote {
  constructor({ vote_id, user_id, post_id, vote_type }) {
    //this.vote_id = vote_id;
    this.user_id = user_id;
    this.post_id = post_id;
    this.vote_type = vote_type;
  }

  static async create(user_id, post_id, vote_type) {
    const query = 'INSERT INTO votes (user_id, post_id, vote_type) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id, post_id, vote_type];

    try {
      const { rows } = await db.query(query, values);
      return new Vote(rows[0]);
    } catch (error) {
      throw new Error('Error creating post: ' + error.message);
    }
  }

  // static async edit(post_id, content) {
  //   const query = 'UPDATE posts SET content = $1 WHERE post_id = $2 RETURNING *';
  //   const values = [content, post_id];

  //   try {
  //     const { rows } = await db.query(query, values);
  //     return new Post(rows[0]);
  //   } catch (error) {
  //     throw new Error('Error editing post: ' + error.message);
  //   }
  // }

  // static async delete(vote_id) {
  //   const query = 'DELETE FROM votes WHERE vote_id = $1';
  //   const values = [vote_id];

  //   try {
  //     await db.query(query, values);
  //     return true;
  //   } catch (error) {
  //     throw new Error('Error deleting vote: ' + error.message);
  //   }
  // }

  static async getLikesByUser(user_id) {
    const query = 'SELECT * FROM votes WHERE user_id = $1';
    const values = [user_id];

    try {
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error ("No votes available");
      }
      return rows.map((c) => new Vote(c));
    } catch (error) {
      throw new Error('Error getting votes: ' + error.message);
    }
  }
}

module.exports = Vote;
