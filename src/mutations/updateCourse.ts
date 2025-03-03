import { GraphQLError } from "graphql";
import { ResultSetHeader } from "mysql2";
import { createDatabaseConnection } from "../database.js";
import { UpdateCourseInput } from "../graphql.types.js";
import { authenticateWithJwt } from "../auth.js";
import { Context } from "../types.js";

export const updateCourse = async (
    _parent,
    args: { id: number; input: UpdateCourseInput },
    context: Context
) => {
    authenticateWithJwt(context);

    const connection = await createDatabaseConnection();

    const fieldsToUpdate: string[] = [];
    const updateValues: any[] = [];

    // handle each field update
    Object.keys(args.input).forEach((updateAttribute) => {
        if (args.input[updateAttribute] !== undefined) {
            fieldsToUpdate.push(`${updateAttribute} = ?`);
            updateValues.push(args.input[updateAttribute]);
        }
    });

    // early exit for nothing to update
    if (fieldsToUpdate.length === 0) {
        throw new GraphQLError("no fields to update");
    }

    updateValues.push(args.id);

    const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE courses SET ${fieldsToUpdate.join(", ")} WHERE id = ?`,
        updateValues
    );

    if (result.affectedRows === 0) {
        throw new GraphQLError("no matching course found to update");
    }

    const [rows] = await connection.execute(
        "SELECT * FROM courses WHERE id = ?",
        [args.id]
    );

    await connection.end();

    return rows[0];
};
