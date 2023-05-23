const { genSalt, hash, compare } = require('bcrypt');
const db = require('../config/postgresdb.js');

class User {
    constructor({ user_id, username, email, password, created_at, is_admin }) {
        this.user_id = user_id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.created_at = created_at;
        this.is_admin = is_admin;
    }

    static async create(data) {
        const { email, username, password } = data;

        const salt = await genSalt();
        const hashed = await hash(password, salt);

        const response = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;', [username, email, hashed])
        if (!response.rowCount) throw new Error('User Creation Error')

        return new User({...response.rows[0]})
    }

    static async comparePassword(input, hashed) {
        return await compare(input, hashed);
    }

    static async findById(id) {
        const response = await db.query('SELECT * FROM users WHERE user_id = $1 LIMIT 1;', [id])
        if (!response.rowCount) throw new Error('Creation Error')

        return new User(response.rows[0])
    }

    static async findByUsername(username) {
        const response = await db.query('SELECT * FROM users WHERE username = $1 LIMIT 1;', [username])
        if (!response.rowCount) throw new Error('User not found.')

        return new User(response.rows[0])
    }

}

module.exports = User;