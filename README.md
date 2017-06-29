## PostIt

 postit is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

## Server-side API Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
#### API Features

The following features make up the PostIt Application Api:

###### Users

- It allows users to be created.  

- It allows users to login  


###### Documents

- It allows new Group to be created by users.  

- It ensures all Groups are accessible based on the permission specified.  

- It allows creator of group to add members to the group

- It ensures members of group can add and retrieve messages to group and from group 


## Hosted App on Heroku
[Heroku Link](https://https://postit-myapi.herokuapp.com)

---

## Below are the API endpoints and their functions
EndPoint                        |   Functionality
------------------------------  |------------------------
POST /api/user/signup           |   create users.
POST /api/user/signin           |   Login user.
GET /api/user                   |   get all users.
POST /api/group                 |   creates group.
POST /api/group/groupid/user    |   add created user to group.
POST/api/group/groupid/message  |   add message to group.
GET /api/group/groupid/message  |   get all created message

