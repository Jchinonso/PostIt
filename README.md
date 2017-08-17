[![Build Status](https://travis-ci.org/Jchinonso/PostIt.svg?branch=server-side)](https://travis-ci.org/Jchinonso/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/Jchinonso/PostIt/badge.svg?branch=development)](https://coveralls.io/github/Jchinonso/PostIt?branch=development)
## PostIt

 postit is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

## Server-side Api Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
#### API Features

The following features make up the PostIt Application Api:

###### Users

- It allows users to be created.  

- It allows users to login  


###### Groups

- It allows new Group to be created by users.  

- It ensures all Groups are accessible based on the permission specified.  

- It allows creator of group to add members to the group

- It ensures members of group can add and retrieve messages to group and from group 

## Hosted App on Heroku
[Heroku Link](https://postit-myapi.herokuapp.com/)

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



