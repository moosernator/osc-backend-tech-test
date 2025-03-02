import { GraphQLError } from "graphql";
import { createDatabaseConnection } from "../database.js";
import { Course, CoursesInput, SortOrder } from "../graphql.types.js";
import { RowDataPacket } from "mysql2";

export const collection = async (_parent, args: { id: string }) => {
    const connection = await createDatabaseConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM courses WHERE courseCollection = ?",
        [args.id]
    );

    if (rows.length === 0) {
        throw new GraphQLError("no collections match the provided name");
    }

    const courses = rows as Course[];
    const collection = { name: courses[0].courseCollection, courses };

    await connection.end();

    return collection;
};
