<img src="https://user-images.githubusercontent.com/1517907/231233022-7eeda0e4-c61f-4ba3-8e73-643f8b24abc6.jpg" width="300">

OSC Technical Assessment for a Backend Engineer
-------------------------------------------------

This assessment is designed to evaluate your technical proficiency in **Node.js**, **GraphQL**, and related backend technologies, as well as your ability to apply that knowledge to solve real-world problems.

### Instructions:
    
1.  You will be expected to write **clean**, **tested**, **well-documented**, and **efficient** code that meets the requirements of each part of the assessment.
    
2.  You may use any third-party libraries or tools you deem necessary to complete the assessment.
    
3.  You will be evaluated based on the **quality**, **readability**, and **maintainability** of your code.
    

### Part 1: API Development

You are tasked with developing a **GraphQL API** for Open Study College that allows internal users to retrieve and add data to a database of distance learning courses.

Your task is to build the following **GraphQL schema** and implement the associated **resolvers**.

#### Required Queries: 
* `courses(limit, sortOrder)`: Returns a list of courses in the database. Accepts optional parameters `limit` (integer) and `sortOrder` (enum: `ASC` | `DESC`).
* `course(id)`: Returns the course with the specified `id`.
* `collections`: Returns a list of all course collections (categories).
* `collection(id)`: Returns a specific collection along with all contained courses.

#### Required Mutations:
* `addCourse(input)`: Adds a new course to the database.
* `updateCourse(id, input)`: Updates a course's details based on its ID.
* `deleteCourse(id)`: Deletes a course from the database by its ID.

#### Course Data Model:
The course data should include at least the following fields:
* ID
* Course Title
* Course Description
* Course Duration
* Course Outcome

You may use any database of your choice, although a form of SQL (e.g., PostgreSQL, MySQL) would be preferable.

### Part 2: Authentication and Authorisation

Extend the GraphQL API developed in Part 1 to include **authentication** and **authorization** functionality. Users should authenticate using JWT tokens before performing any mutations (adding, updating, or deleting courses).

#### Required Authentication Flow:
* `register(username, password)`: Allows users to create a new account.
* `login(username, password)`: Authenticates users and returns an access token (JWT).
* `Protect the mutations (`addCourse`, `updateCourse`, and `deleteCourse`) so that only authenticated users with valid JWT tokens can perform these actions.

#### Bonus:
Implement **role-based authorisation** (e.g., Admins can perform all actions, but regular users can only add or update their own courses).


### Assessment Criteria:

*   Your ability to design and develop a GraphQL API using Node.js and related technologies
*   Your ability to configure and implement a working database.
*   Your ability to implement **authentication** and **authorisation** using **JSON Web Tokens (JWT)**
*   Your understanding of **best practices** for writing clean, maintainable, and efficient code.
* Performance optimization of the GraphQL API (e.g., **batching** and **caching** queries).

### Submission

Please present your work in a Git version control repository hosting service such as Github, Bitbucket, GitLab, Codepen, Codesandbox etc and provide some form of a demo of your submission working.


### Time Limit:

We want to respect your time, so this should not take you more than 4 hours. If you run out of time, please document how you would finish this assessment in the README.


**Best of luck!**
