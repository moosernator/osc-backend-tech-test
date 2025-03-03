import { createDatabaseConnection } from "../database.js";
import { Course } from "../graphql.types.js";
import { RowDataPacket } from "mysql2";

// Due to time constraints and design decisions, I have not implemented
// another collections table (instead having collection as a course attribute).
// If I did, I would use a dataloader for this query (batch initial
// collections query and subsequent queries to get courses in each collection)

export const collections = async () => {
    const connection = await createDatabaseConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM courses"
    );

    await connection.end();

    const courses = rows as Course[];
    const collectionMap = new Map<string, Course[]>();

    // create map to categorize courses uniquely
    courses.forEach((course) => {
        if (!collectionMap.has(course.courseCollection)) {
            collectionMap.set(course.courseCollection, []);
        }

        collectionMap.get(course.courseCollection).push(course);
    });

    const formattedCollections = Array.from(collectionMap.entries()).map(
        ([name, courses]) => ({ name, courses })
    );

    return formattedCollections;
};
