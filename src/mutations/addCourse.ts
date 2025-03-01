import { ResultSetHeader } from "mysql2"
import { createConnection } from "../database.js"
import { AddCourseInput } from "../graphql.types.js"

export const addCourse = async (_parent, args: { input: AddCourseInput }) => {
    const connection = await createConnection()

    // duplicate courseTitles prohibited through table column uniqueness
    const [result] = await connection.execute<ResultSetHeader>(`INSERT INTO courses (${Object.keys(args.input).join(', ')}) VALUES (${Object.keys(args.input).map(() => '?').join(', ')})`, Object.values(args.input))

    const [rows] = await connection.execute('SELECT * FROM courses WHERE id = ?', [result.insertId])

    await connection.end()

    return rows[0]
}
