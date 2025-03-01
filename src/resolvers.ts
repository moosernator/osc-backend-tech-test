import { course } from "./queries/course.js"
import { courses } from "./queries/courses.js"
import { addCourse } from "./mutations/addCourse.js"
import { updateCourse } from "./mutations/updateCourse.js"
import { deleteCourse } from "./mutations/deleteCourse.js"

const resolvers = {
    Query: {
        courses,
        course
    },
    Mutation: {
        addCourse,
        updateCourse,
        deleteCourse,
    }
}

export default resolvers