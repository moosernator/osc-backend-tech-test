import { GraphQLError } from "graphql"
import { createConnection } from "../database.js"
import { CoursesInput, SortOrder } from "../graphql.types.js"

export const courses = async (_parent, args: { input: CoursesInput }) => {
    const connection = await createConnection()

    // have default alphabetical sort
    let query = `SELECT * FROM courses ORDER BY courseTitle ${args.input.sortOrder || SortOrder.Asc} `

    if (args.input.limit !== undefined) {
        // handle invalid limits
        if (args.input.limit < 0) {
            throw new GraphQLError('limit must be at least 1')
        }

        query += ` LIMIT ${args.input.limit}`
    }
    const [result] = await connection.execute(query)

    await connection.end()

    return result
}