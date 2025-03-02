import { RowDataPacket } from "mysql2";
import { createDatabaseConnection } from "../database.js";
import { GraphQLError } from "graphql";

export const course = async (_parent, args: { id: number }) => {
    const connection = await createDatabaseConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM courses WHERE id = ?",
        [args.id]
    );

    await connection.end();

    if (rows.length === 0) {
        throw new GraphQLError("no course matches that id");
    }

    return rows[0];
};
