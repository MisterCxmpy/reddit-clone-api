const { genSalt, hash, compare } = require("bcrypt");
const db = require("../config/postgresdb.js");

class User {
  constructor({
    user_id,
    username,
    email,
    password,
    created_at,
    score,
    votes,
    joined_communities,
    is_admin,
  }) {
    this.user_id = user_id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.created_at = created_at;
    this.score = score;
    this.votes = votes;
    this.joined_communities = joined_communities;
    this.is_admin = is_admin;
  }

  static async create(data) {
    const { email, username, password } = data;

    const salt = await genSalt();
    const hashed = await hash(password, salt);

    const response = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
      [username, email, hashed]
    );
    if (!response.rowCount) throw new Error("User Creation Error");

    return new User({ ...response.rows[0] });
  }

  static async comparePassword(input, hashed) {
    return await compare(input, hashed);
  }

  static async findById(id) {
    const response = await db.query(
      "SELECT * FROM users WHERE user_id = $1 LIMIT 1;",
      [id]
    );
    if (!response.rowCount) throw new Error("Creation Error");

    return new User(response.rows[0]);
  }

  static async findByUsername(username) {
    const response = await db.query(
      "SELECT * FROM users WHERE username = $1 LIMIT 1;",
      [username]
    );
    if (!response.rowCount) throw new Error("User not found.");

    return new User(response.rows[0]);
  }

  static async vote(user_id, post_id, post_name, vote_type) {
    const query = "UPDATE users SET votes = votes || $1 WHERE user_id = $2 RETURNING *;";
    const values = [{ post_id, post_name, vote_type }, user_id];

    try {
      const { rows } = await db.query(query, values);
      return new User(rows[0]);
    } catch (error) {
      throw new Error('Error creating vote: ' + error.message);
    }
  }

  static async update(user_id, user) {
    const { username, email, score, votes, joined_communities } = user;

    const votesJson = JSON.stringify(votes);
    const joinedJson = JSON.stringify(joined_communities);

    const query = "UPDATE users SET username = $1, email = $2, score = $3, votes = $4, joined_communities = $5 WHERE user_id = $6 RETURNING *;";
    const values = [username, email, score, votesJson, joinedJson, user_id]; // Use the votesJson string in the values array
  
    try {
      const { rows } = await db.query(query, values);
      return new User(rows[0]);
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }
}

module.exports = User;
