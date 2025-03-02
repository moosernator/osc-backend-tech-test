import { ResultSetHeader } from "mysql2";
import { createDatabaseConnection } from "../database.js";
import { hash } from "bcrypt";

export const register = async (
    _parent,
    args: { username: string; password: string }
) => {
    const connection = await createDatabaseConnection();

    const hashedPassword = await hash(args.password, 10); // don't store plain text passwords

    // duplicate usernames prohibited through table column uniqueness
    const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [args.username, hashedPassword]
    );

    const [rows] = await connection.execute(
        "SELECT * FROM users WHERE id = ?",
        [result.insertId]
    );

    await connection.end();

    return rows[0].username;
};
