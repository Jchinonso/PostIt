[![Build Status](https://travis-ci.org/Jchinonso/PostIt.svg?branch=server-side)](https://travis-ci.org/Jchinonso/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/Jchinonso/PostIt/badge.svg?branch=development)](https://coveralls.io/github/Jchinonso/PostIt?branch=development)
## PostIt
!![image](https://user-images.githubusercontent.com/23220841/31301111-920a9d7e-aaef-11e7-8369-7f8f5ef04b33.png)
![image](https://user-images.githubusercontent.com/23220841/31301016-f3bb1a9a-aaee-11e7-854d-68c7bde5b9ac.png)
 postit is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.
 

 Development
-------------
The application was developed with [NodeJs](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM
The frontend was built using reactJs with redux framework.


API DOCUMENTATION
-----------------
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

#### API Features
The following features make up the PostIt Application Api:

#### Authentication
- It makes use of jsonwebtoken(jwt) for authentication
- It generates a token on successful login and send it as part of response
- It accepts the generated token before given access to all the protected routes

###### Users
- It allows users to be created.  
- It allows users to login  


###### Groups
- It allows new Group to be created by users.  
- It ensures all Groups are accessible based on the permission specified.  
- It allows creator of group to add members to the group
- It ensures members of group can add and retrieve messages to group and from group 


---

## Below are the API endpoints and their functions
EndPoint                       |   Functionality
------------------------------ |------------------------
POST /api/user/signin          |   Logs a user in.
POST /api/user/signup          |   Create a new user.            
GET /api/user                  |   Get all users.
POST /api/group                |   Creates a new group.
POST /api/group/groupid/user   |   Add user to group.
POST /api/group/groupid/message|   Add message to group.
GET /api/group/groupid/message |   Get all messages that belongs to group.

#### Routes
* POST `/api/user/signup` Use this route to create an account. The following fields are required:
  * `username` The first name of the new user
  * `email`     Email address of the new user
  * `password` A secure password

* POST `/api/user/signin` Use this route to sign in to the application. The following fields are required:
  * `email`     Email address of the new user
  * `password` A secure password

* POST `/api/group` Use this route to create a new group. The following fields are required:
  * `name`  The title of the group
  * `description`     A description of the purpose of the group

* POST `/api/group/<groupId>/user` Use this route to add a user to a pre-existing group
  * `username` The username of a user registered on the application
  

* POST `/api/group/<groupId>/message` Use this route to post a message to a group
  * `content` The body of the message to be posted to the group


* GET `/api/group/<groupId>/messages` Use this route to get messages made to a group
* GET `/api/user` Use this route to load all registered members 



Technologies Used
-----------------

* [NodeJS:](https://nodejs.org/en/) is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
* [Javascript ES6:](https://en.wikipedia.org/wiki/ECMAScript) ES6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, spread opeartor, etc.
* [React:](https://facebook.github.io/react/tutorial/tutorial.html) Facebook open source, efficient, javascript library for building front-end projects.
* [PostgreSQL:](https://www.postgresql.org/) PostgreSQL is a powerful, open source object-relational database system (ORDBMS) that offers modern database features such as complex queries, foreign keys, etc.
* [Sequelize:](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js that supports different dialects such PostgreSQL, MySQL, and SQLite.
* [Babel:](https://babeljs.io/)  Babel transpiles es6 codes to es5.
* [Webpack:](https://webpack.github.io/docs/what-is-webpack.html) Webpack is used to bundle modules and does tasks automation.
* [Axios:](https://www.npmjs.com/package/axios) Axios is an http client library used in consuming API.

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `https://github.com/jchinonso/PostIt`
3.  Change your directory `cd PostIt`
4.  Install all dependencies `npm install`
5.  Start the app `npm run start:dev` for development Or
6.  Run `npm start` to use transpiled code
7.  Use [postman](https://www.getpostman.com/) to consume the API

Tests
-----
*  The tests have been written using Mocha framework and Chai assertion library
*  Run the test with `npm test`

Limitations
-----------
- Group creator cannot remove users from groups
- Users cannot update their profile
- Users cannot deactivate their accounts

Coding Style
------------
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

How to Contribute
-----------------
- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works

The full API documentation can be viewed at <a href="https://jchinonso.github.io/slate/" target="_blank">here</a>

### Author
Johnson Chinonso
