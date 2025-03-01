import { GraphQLError } from "graphql";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { createDatabaseConnection } from "../database.js";

export const deleteCourse = async (_parent, args: { id: number }) => {
  const connection = await createDatabaseConnection();

  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM courses WHERE id = ?",
    [args.id]
  );

  // early exit for nothing to delete
  if (rows.length === 0) {
    throw new GraphQLError("no matching course found to delete");
  }

  // for return info
  const deletedCourse = rows[0];

  const [result] = await connection.execute<ResultSetHeader>(
    "DELETE FROM courses WHERE id = ?",
    [args.id]
  );

  // check deletion was successful
  if (result.affectedRows === 0) {
    throw new GraphQLError("no matching course found to delete");
  }

  await connection.end();

  return deletedCourse;
};
