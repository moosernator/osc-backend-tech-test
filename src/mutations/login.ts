import { RowDataPacket } from "mysql2";
import { createDatabaseConnection } from "../database.js";
import { compare } from "bcrypt";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const login = async (
    _parent,
    args: { username: string; password: string }
) => {
    const connection = await createDatabaseConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE username = ?",
        [args.username]
    );

    if (rows.length === 0) {
        throw new GraphQLError("Invalid credentials");
    }

    const user = rows[0];
    const isPasswordValid = await compare(args.password, user.password);

    if (!isPasswordValid) {
        throw new GraphQLError("Invalid credentials"); // same error message to not provide info in brute force attacks
    }

    const authToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET || "JWT_SECRET",
        { expiresIn: "1h" }
    );

    await connection.end();

    return { token: authToken, username: user.username };
};
