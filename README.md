## Project Management REST API

# Description

This API project written in Node.js with dependencies :

- bcrypt ^5.1.0
- body-parser ^1.20.2
- dotenv ^16.0.3
- express ^4.18.2
- jsonwebtoken ^9.0.0
- mongoose ^7.1.

# API

This API have 3 main entities: User, Project, and Task.
With this API, users can register, login, manage projects, and manage tasks within the project.
Enforced authentication and validation help maintain the security and integrity of data sent and received by the API.

# Endpoints

- /users/register     : [post] User registration for new user by posting name, email & password
- /users/login        : [post] Login user by posting email & password, also generate token authorization
- /users              : [get] all users registered 
- /users              : [post] Add new user by posting name, email & password
- /users/:id          : [get] one user registered by Id
- /users/:id          : [post] Edit active (Loggedin) user data by Id
- /users/:id          : [delete] Delete active (Loggedin) user by Id
- /project            : [get] all projects data
- /project            : [post] Add new project by posting name, description & due-date
- /project/:id        : [get] one project by Id
- /project/:id        : [post] Edit specific project belong to active (Loggedin) user by Id
- /project/:id        : [delete] Delete specific project belong to active (Loggedin) user by Id
- /task               : [get] all tasks 
- /task               : [post] Add new task by posting name, description, due-date & project-id
- /task/:id           : [get] one task by Id
- /task/:id           : [post] Edit specific task belong to active (Loggedin) user by Id
- /task/:id           : [delete] Delete specific task belong to active (Loggedin) user by Id

# Authentication

- Authentication is performed using JSON Web Token (JWT).
- Users must login to get JWT tokens.
- Any request that requires authentication must include the JWT token in the Authorization header with the "Bearer" schema.

# Authorization

- Certain routes in the API require authorization to access.
- Middleware is used to verify the JWT token sent in the Authorization header of each request
- Once the user is authenticated, access control can be implemented to ensure users have the necessary permissions to perform specific actions.

# Error Handling

- There is a special middleware to handle errors that occur in the application.
- Clear and customizable error messages are sent back to the client.

# Security:

- Security is applying the best security principles of OWASP (Open Web Application Security Project).
- Input sanitization and data validation are used to prevent attacks such as SQL injection or XSS.

# Documentation

- Node modules with any dependencies which has been explained above
- Middlewate folder contain 2 files auth & error.
- Models folder contain 3 model files user, project, task.
- Routes folder contain 3 route & controller each files.
- ENV file contain the simple secret key of token.
- db.js file contain script for database connection.
- index.js file contain the main points of this application.
- request.rest is REST CLIENT file to test and access API endpoints directly.
- README.md is this file you open now
