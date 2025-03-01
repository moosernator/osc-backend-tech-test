import { createConnection } from "mysql2/promise";
import { Course, SortOrder } from "../graphql.types.js";
import resolvers from "../resolvers.js";
import { GraphQLError } from "graphql";

jest.mock("mysql2/promise");

describe("Resolvers", () => {
    let mockConnection: any;
    const executeSpy = jest.fn();
    const endSpy = jest.fn();

    beforeEach(async () => {
        mockConnection = {
            execute: executeSpy,
            end: endSpy,
        };

        (createConnection as jest.Mock).mockResolvedValue(mockConnection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockCourses: Course[] = [
        {
            id: "123",
            courseTitle: "Course 1",
            courseDescription: "Course 1 Description",
            courseDuration: 12,
            courseOutcome: "Certificate",
        },
        {
            id: "456",
            courseTitle: "Second Course",
            courseDescription: "Course 2 Description",
            courseDuration: 6,
            courseOutcome: "Certificate",
        },
    ];

    describe("Queries", () => {
        describe("when calling the courses query", () => {
            it("should handle an invalid limit", async () => {
                await expect(
                    resolvers.Query.courses(null, {
                        input: { limit: -1 },
                    })
                ).rejects.toThrow(new GraphQLError("limit must be at least 1"));
            });

            it("should return the list of courses correctly if no arguments are given", async () => {
                mockConnection.execute.mockResolvedValueOnce([mockCourses]);

                const courses = await resolvers.Query.courses(null, {
                    input: {},
                });

                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(executeSpy).toHaveBeenCalledWith(
                    "SELECT * FROM courses ORDER BY courseTitle ASC"
                );
                expect(courses).toEqual(mockCourses);
            });

            it("should return the list of courses correctly if a limit argument is given", async () => {
                mockConnection.execute.mockResolvedValueOnce([
                    [mockCourses[0]],
                ]);

                const courses = await resolvers.Query.courses(null, {
                    input: { limit: 1 },
                });

                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(executeSpy).toHaveBeenCalledWith(
                    "SELECT * FROM courses ORDER BY courseTitle ASC LIMIT 1"
                );
                expect(courses).toEqual([mockCourses[0]]);
            });

            it("should return the list of courses correctly if a sort argument is given", async () => {
                mockConnection.execute.mockResolvedValueOnce([
                    [mockCourses[1], mockCourses[0]],
                ]);

                const courses = await resolvers.Query.courses(null, {
                    input: { sortOrder: SortOrder.Desc },
                });

                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(executeSpy).toHaveBeenCalledWith(
                    "SELECT * FROM courses ORDER BY courseTitle DESC"
                );
                expect(courses).toEqual([mockCourses[1], mockCourses[0]]);
            });

            it("should return the list of courses correctly if both arguments are given", async () => {
                mockConnection.execute.mockResolvedValueOnce([
                    [mockCourses[1]],
                ]);

                const courses = await resolvers.Query.courses(null, {
                    input: { limit: 1, sortOrder: SortOrder.Desc },
                });

                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(executeSpy).toHaveBeenCalledWith(
                    "SELECT * FROM courses ORDER BY courseTitle DESC LIMIT 1"
                );
                expect(courses).toEqual([mockCourses[1]]);
            });
        });

        describe("when calling the course query", () => {
            it("should handle an invalid id", async () => {
                mockConnection.execute.mockResolvedValueOnce([[]]);

                await expect(
                    resolvers.Query.course(null, {
                        id: 1,
                    })
                ).rejects.toThrow(
                    new GraphQLError("no course matches that id")
                );
            });

            it("should return the course with the specified id", async () => {
                mockConnection.execute.mockResolvedValueOnce([
                    [mockCourses[0]],
                ]);

                const course = await resolvers.Query.course(null, {
                    id: 123,
                });

                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(executeSpy).toHaveBeenCalledWith(
                    "SELECT * FROM courses WHERE id = ?",
                    [123]
                );
                expect(course).toEqual(mockCourses[0]);
            });
        });
    });

    describe("Mutations", () => {
        describe("when calling the addCourse mutation", () => {
            it("should create a new course", async () => {
                mockConnection.execute
                    .mockResolvedValueOnce([{ insertId: mockCourses[0].id }])
                    .mockResolvedValueOnce([[mockCourses[0]]]);

                const course = await resolvers.Mutation.addCourse(null, {
                    input: {
                        courseTitle: mockCourses[0].courseTitle,
                        courseDescription: mockCourses[0].courseDescription,
                        courseDuration: mockCourses[0].courseDuration,
                        courseOutcome: mockCourses[0].courseOutcome,
                    },
                });

                expect(executeSpy).toHaveBeenNthCalledWith(
                    1,
                    "INSERT INTO courses (courseTitle, courseDescription, courseDuration, courseOutcome) VALUES (?, ?, ?, ?)",
                    ["Course 1", "Course 1 Description", 12, "Certificate"]
                );
                expect(executeSpy).toHaveBeenNthCalledWith(
                    2,
                    "SELECT * FROM courses WHERE id = ?",
                    ["123"]
                );
                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(course).toEqual(mockCourses[0]);
            });
        });

        describe("when calling the deleteCourse mutation", () => {
            it("should handle an invalid id", async () => {
                mockConnection.execute.mockResolvedValueOnce([[]]);

                await expect(
                    resolvers.Mutation.deleteCourse(null, {
                        id: 1,
                    })
                ).rejects.toThrow(
                    new GraphQLError("no matching course found to delete")
                );
            });

            it("should delete a course", async () => {
                mockConnection.execute
                    .mockResolvedValueOnce([[mockCourses[0]]])
                    .mockResolvedValueOnce([{ insertId: mockCourses[0].id }]);

                const course = await resolvers.Mutation.deleteCourse(null, {
                    id: 123,
                });

                expect(executeSpy).toHaveBeenNthCalledWith(
                    1,
                    "SELECT * FROM courses WHERE id = ?",
                    [123]
                );
                expect(executeSpy).toHaveBeenNthCalledWith(
                    2,
                    "DELETE FROM courses WHERE id = ?",
                    [123]
                );
                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(course).toEqual(mockCourses[0]);
            });
        });

        describe("when calling the updateCourse mutation", () => {
            it("should update a course", async () => {
                mockConnection.execute
                    .mockResolvedValueOnce([{ affectedRows: 1 }])
                    .mockResolvedValueOnce([[mockCourses[0]]]);

                const course = await resolvers.Mutation.updateCourse(null, {
                    id: 123,
                    input: { courseTitle: "New title" },
                });

                expect(executeSpy).toHaveBeenNthCalledWith(
                    1,
                    "UPDATE courses SET courseTitle = ? WHERE id = ?",
                    ["New title", 123]
                );
                expect(executeSpy).toHaveBeenNthCalledWith(
                    2,
                    "SELECT * FROM courses WHERE id = ?",
                    [123]
                );
                expect(endSpy).toHaveBeenCalledTimes(1);
                expect(course).toEqual(mockCourses[0]);
            });

            it("should handle no fields to update", async () => {
                await expect(
                    resolvers.Mutation.updateCourse(null, {
                        id: 123,
                        input: {},
                    })
                ).rejects.toThrow(new GraphQLError("no fields to update"));
            });

            it("should handle no fields to update", async () => {
                mockConnection.execute.mockResolvedValueOnce([
                    { affectedRows: 0 },
                ]);

                await expect(
                    resolvers.Mutation.updateCourse(null, {
                        id: 123,
                        input: { courseTitle: "Test" },
                    })
                ).rejects.toThrow(
                    new GraphQLError("no matching course found to update")
                );
            });
        });
    });
});
