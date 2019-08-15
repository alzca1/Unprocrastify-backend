

# Unprocrastify

<br>

## Description

App to manage to-do tasks -and lists- so that humankind can finally overcome procrastination, for God's sake!

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anon I can sign up in the platform so that I can start start adding tasks and creating task lists.
-  **Login:** As a user I can login to the platform so that I can manage my tasks and task lists. 
-  **Logout:** As a user I can logout from the platform so no one else can see how good I am procrastinating. 
-  **Add Task** As a user I can add a task, along with its deadline, priority level and notes related with the task. 
-  **Add Task List** As a user I can add a task list, as well as choosing an identifying color and the users I am going to share the list with.
-  **Edit Task** As a user I can edit a task and change its name, deadline and notes.
-  **Edit List** As a user I can edit a list and change its name, color and add/remove the users I am sharing the list with.
-  **Complete Task** As a user I can complete a task and store it in the completed-tasks section within the list it belongs to. 
-  **Remove Task** As a user I can remove a task.
-  **Remove Task List** As a user I can remove a whole list.


-  **Edit profile** As a user I can edit my profile (mail and password) in case I want to change my mail account and/or my password. 
-  **Add Sharing Users** As a user I can add users to my list so that we can add/edit/remove tasks inside the list. 
-  **Remove Sharing Users** As a user I can remove users to my list so that they cannot access the list anymore. 
-  **View List** As a user I want to see the list along with all the tasks included in it. 





## Backlog

User profile:
- Add geolocated tasks. 
- User permissions. (set read/modify/delete permissions)




<br>


# Client / Frontend

## Routes (React App)
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public      | Home page                                        |
| `/auth/signup`            | SignupPage           | anon only   | Signup form, link to login, navigate to homepage after signup |
| `/auth/login`             | SplashPage/LoginPage | anon only   | Login form, link to signup, navigate to homepage after login |
| `/auth/logout`            | n/a                  | user only   | Navigate to homepage after logout, expire session            |
| `/homepage`               | Homepage             | user only   | Shows all task lists                              |
| `/task/addtask`           | AddTaskPage          | user only   | Shows form to add a task                                           |
| `/list/addlist`           | AddListPage          | user only   | Shows form to add a list                                           |
| `/task/edit/:id`          | Taskdetailpage       | user only   | Details of a task to edit                              |
| `/task/:id`               | n/a                  | user only   | Delete task                                            |
| `/list/edit/:id`          | Listdetailpage       | user only   | Details of a list to edit                              |
| `/list/:id`               | n/a                  | user only   | Delete list                                            |
| `/user`                   | UserPage             | user only   | Shows the user page                               |
| `/user/edit/:id`          | UserPage             | user only   | Edits the user details                               |
| `/list/sharing/:id`       | SharingUsersPage     | user only   | Edit sharing users of a list                                    |
| `/list/sharing/:id`       | SharingUsersPage     | user only   | Delete sharing user from a list                                |



## Components

- Navbar

- SplashPage / LoginPage

- SignupPage

- HomePage

- AddTaskPage

- TaskDetailPage

- AddListPage

- ListDetailPage

- UserPage

- SharingUsersPage

- Calendar
 


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Task Service
  - task.detail(id)
  - task.add(id)
  - task.delete(id)
  
- List Service 

  - list.detail(id)
  - list.add(id)
  - list.delete(id)

- Sharing Users Service

  - sharing.add(id)
  - sharing.delete(id)
  



<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  
}
```



Task model

```javascript
 {
   name: {type: String, required: true},
   duedate: {type: Date},
   priority:{type: String, enum:{default:'none', 'low', 'medium', 'high'}, required:true}
   notes:{type:String},
   list:{type:ObjectID}, 
   completed:{type: Boolean},
   owner:{type:ObjectID}, 
   user:{type:ObjectID}
 }
```



List model

```javascript
{
  name: {type: String, required: true},
  color: {type: String, required: true}, enum:{'yellow','green','blue','purple','orange','red'},
  tasks: {type: ObjectID},
  owner: {type: ObjectID}.
  users: {type: ObjectID}
}
```



<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/lists      `                |                              |                | 400          | Shows all lists                                         |
| GET         | `/lists/:id`                  | {id}                         |                |              | Show specific list                                     |
| POST        | `/list       /add-list       `| {}                           | 201            | 400          | Create and save a new list                             |
| PUT         | `/list       /edit/:id`       | {name,color,password}        | 200            | 400          | edit list                                                     |
| DELETE      | `/list       /delete/:id`     | {id}                         | 201            | 400          | delete list                                                   |
| GET         | `/task/:id`                   | {id}                         |                |              | Show specific task                                     |
| POST        | `/task       /add-task       `| {}                           | 201            | 400          | Create and save a new task                             |
| PUT         | `/task       /edit/:id`       | {name,color,password}        | 200            | 400          | edit task                                                     |
| DELETE      | `/task       /delete/:id`     | {id}                         | 201            | 400          | delete task                                                   |
| PUT         | `/task       /complete/:id`   | {id}                         | 201            | 400          | complete task                                                   |
| GET         | `/user       /:id`            | {id}                         |                | 400          | show current user details                                                 |
| PUT         | `/user       /:id`            |  {e-mail,password}           |                | 400          | edit  user details                                                 |
| GET         | `/list/:id   /sharing`         | {id}                         |200             | 400         | show sharing users of a list                                          |
| POST        | `/list/:id   /add-sharing/:id` |                              |201             |             | add sharing user to a list                                         |
| DELETE      | `/list/:id   /delete-sharing/:id` |                           |201             |             | delete sharing user from a list                                         |



<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/MfwXfK8E) 


### Git


[Client repository Link](https://github.com/alzca1/Unprocrastify)

[Server repository Link](https://github.com/alzca1/Unprocrastify)

[Deployed App Link](http://heroku.com)

### Slides


[Slides Link](http://slides.com)








