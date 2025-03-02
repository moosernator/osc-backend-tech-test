import { course } from "./queries/course.js";
import { courses } from "./queries/courses.js";
import { addCourse } from "./mutations/addCourse.js";
import { updateCourse } from "./mutations/updateCourse.js";
import { deleteCourse } from "./mutations/deleteCourse.js";
import { collections } from "./queries/collections.js";
import { collection } from "./queries/collection.js";
import { register } from "./mutations/register.js";
import { login } from "./mutations/login.js";

const resolvers = {
    Query: {
        courses,
        course,
        collections,
        collection,
    },
    Mutation: {
        addCourse,
        updateCourse,
        deleteCourse,
        register,
        login,
    },
};

export default resolvers;
