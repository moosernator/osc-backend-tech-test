<img src="https://user-images.githubusercontent.com/1517907/231233022-7eeda0e4-c61f-4ba3-8e73-643f8b24abc6.jpg" width="300">

OSC Technical Assessment for a Backend Engineer
-------------------------------------------------

This assessment is designed to evaluate your technical proficiency in Node.js and related backend technologies, as well as your ability to apply that knowledge to solve real-world problems.

### Instructions:
    
1.  You will be expected to write clean, tested, well-documented, and efficient code that meets the requirements of each part of the assessment.
    
2.  You may use any third-party libraries or tools you deem necessary to complete the assessment.
    
3.  You will be evaluated based on the quality, readability, and maintainability of your code.
    

### Part 1: API Development

You are tasked with developing a RESTful API for Open Study College that allows internal users to retrieve and add data to a database of distance learning courses. The API should create the following endpoints but feel free to add to this should you feel necessary:

*   GET - returns a list of all courses in the database
*   GET - returns the course with the specified ID eg. `/courses/:id`
*   GET - limit the return results eg. `?limit=5`
*   GET - return results in either Ascending or Descending order (Default to Ascending)
*   GET - returns a list of all collections (Categories)
*   GET - returns a list of all courses in a specific collection

The course data should include at least the following fields: Course Title, Course Description, Course Duration, and Course Outcome. You may use any database of your choice although a form of SQL would be preferable.

### Part 2: Authentication and Authorisation

Extend the API developed in Task 1 to include authentication and authorisation functionality. The API should require users to authenticate before they can add or modify course data. The following endpoints should be added:

*   POST /register - allows users to create a new account
*   POST /login - allows users to authenticate and receive an access token
*   POST - a user can add a new course to the database
*   PUT - a user can update a course
*   DELETE - a user can delete a course

The API should use JSON Web Tokens (JWT) to authenticate users and authorise their access to protected resources. You may use any JWT library of your choice.


### Assessment Criteria:

*   Your ability to design and develop a RESTful API using Node.js and related technologies
*   Your ability to configure and implement a working database.
*   Your ability to implement authentication and authorisation using JSON Web Tokens
*   Your ability to optimise the performance of a Node.js application
*   Your understanding of best practices for writing clean, maintainable, and efficient code

### Submission

Please present your work in a Git version control repository hosting service such as Github, Bitbucket, GitLab, Codepen, Codesandbox etc and provide some form of a demo of your submission working.


### Time Limit:

We want to respect your time, so this should not take you more than 4 hours. If you run out of time, please document how you would finish this assessment in the README.


Best of luck!
