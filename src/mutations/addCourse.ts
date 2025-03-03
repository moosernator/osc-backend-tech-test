import { ResultSetHeader } from "mysql2";
import { createDatabaseConnection } from "../database.js";
import { AddCourseInput } from "../graphql.types.js";
import { authenticateWithJwt } from "../auth.js";
import { Context } from "../types.js";

export const addCourse = async (
    _parent,
    args: { input: AddCourseInput },
    context: Context
) => {
    authenticateWithJwt(context);

    const connection = await createDatabaseConnection();

    // duplicate courseTitles prohibited through table column uniqueness
    const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO courses (${Object.keys(args.input).join(", ")}) VALUES (${Object.keys(
            args.input
        )
            .map(() => "?")
            .join(", ")})`,
        Object.values(args.input)
    );

    const [rows] = await connection.execute(
        "SELECT * FROM courses WHERE id = ?",
        [result.insertId]
    );

    await connection.end();

    return rows[0];
};
