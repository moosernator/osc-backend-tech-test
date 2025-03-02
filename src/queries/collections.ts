import { createDatabaseConnection } from "../database.js";
import { Course, CoursesInput, SortOrder } from "../graphql.types.js";
import { RowDataPacket } from "mysql2";

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
