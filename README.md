***Welcome to the home of your group's TIETA12, part 2 coursework code and documentation!***

This README.md file is where your group writes your project plan/project report.

When you write it, you must use Markdown. [Documentation for GitLab Flavored Markdown (GFM)](https://docs.gitlab.com/ee/user/markdown.html).

The directory structure of the code is up to your group to decide, but this README.md file must remain in place.


# Initial project plan document
The headers that must be present in this document are shown here. 

For instructions on what to add under these headers, see the course project assignment document, [see the coursework assignment document](https://docs.google.com/document/d/1ctG6mURrs1WlqwwPnMOFE_mSIEhZVCjp2XGefAZMdxQ/edit#heading=h.vsanic5plbto)

## Course project group information 

### Internal Server Error
Antti Pessa, 431566, antti.pessa@tuni.fi<br>
Henri Hakkarainen, 434896, henri.hakkarainen@tuni.fi

Gitlab repo URL: https://course-gitlab.tuni.fi/tieta12-2019-2020/internal-server-error.git

## How to run the project application
First of all, modify the Vagrantfile used so that it forwards also port 3001 which is reserved for React in this project. Add the following line to Vagrantfile under "Open ports" part:

- config.vm.network "forwarded_port", guest: 3001, host: 3001   # React

During development, its required to start two terminal windows. One is for starting the Express-server on port 3000 and the other is for starting the React build, which runs on port 3001. This helps in following the logs on the server side. After downloading this folder structure, first run the following command on your local machine:

`$ npm run setup`

 This script installs the required modules for each subdirectory. After that the following commands must be run inside Vagrant on their own terminal windows:

`$ npm run server` - starts the Express server (backend)<br>
`$ npm run app` - starts the React application (frontend)

Now the React application UI can be viewed on http://localhost:3001.

Server is started with nodemon, so if any changes are made to the code, the server automatically restarts which makes the development and testing much easier. Also changes done to React application are immediately visible on the browser (requires page refresh).

When the project is ready for deployment, its possible to add the following script to package.json, which both starts the server and the React application at the same time:

`"dev": "run-p server app"`

Then it is possible to start both the backend and frontend with a single command:

`$ npm run dev`

Also on deployment phase, the server script should be modified not to use nodemon anymore, for example like:

`"node backend/app.js"`

## Planned functionality

### Implementation order
1. Backend 
- REST API
    - Role (Admin, Shopkeeper, registered user, unregistered user)
    - Item
- MongoDB
2. Frontend 
- React
- Redux
3. Testing (If enough time)
- Mocha & Chai
- CI/CD pipeline


## Pages and navigation    
## Modules your group created in your Node project
```
.
├── backend
│   ├── app.js                  --> express app
│   ├── router.js               --> main router that setups other routes
│   ├── package.json            --> app info and dependencies
│   ├── models                  --> models that reflect the db schemas
│   │                               and take care of storing data
│   ├── routes                  --> a dir for router modules
│   │   ├── item.js             --> /item router
│   └── └── users.js            --> /users router
│
├── frontend
│   ├── src                     --> all react files
│   │   ├── app.js              --> react app
│   │   ├── components          --> react components
│   │   │   ├── ...
│   │   │   └── ...
│   ├── public                  
└── └── package.json            --> app info and dependencies

```
## Mongo database and Mongoose schemas
Models we're planning to use and their attributes:
- User
    - Name (String)
    - Email (String)
    - Password (String)
    - Role (String) [`admin`/`shopkeeper`/`registered`]
    - Offers ([Item])
- Item
    - Name (String)
    - Owner (User)
    - Price (Number)
    - Onsale (Boolean)

The system holds information about the items that have been saved to the database and also about users that are buying or selling items. Item is saved the first time it is listed to being sold and a user is created the moment they register at the website.<br><br>
User model contains a username, email and password. User model also has a role, which defaults to registered user so that the user is able to buy listed items and sell items to the shopkeepers on the webstore. User can be promoted to shopkeeper role (requires admin rights) and that role is able to sell items to all other customers (these offers are listed on the store for everyone). Admin users can edit basically anything. User model also has an attribute list of offers, which holds items that the user is currently selling on the store.<br><br>
Item model contains name of the item and the current owner of the item, which points to a user (each item belongs to some user). Item model also has attribute that holds information if the items is currently on sale or not (true/false). If the item is on sale, it also must have price attribute set (price must be >= 0).<br><br>
If a user unregisters from the webstore, all items that he/she owns are also removed from the database, that is why it's good to have information about the owner of the items.

## API
Here you describe how your group’s website's API endpoints, URLs, paths, parameters and payloads.

This documentation may change a little during the coursework if more API paths are found the be needed or some changes must be done.

Base API path: http://localhost:3000/api

API endpoints:
- GET-request
    - `/users` - list all users from the database
    - `/user/id` - get information about a specific user by id
    - `/user/id/offers` - list all items that belong to a specific user and are listed for sale
    - `/items` - list all items from the database
    - `/items/userid` - list all items that belong to a specific user
    - `/items/onsale` - list items that are owned by shopkeepers and are listed for sale
    - `/items/offers` - list items that are owned by registered users and are listed for sale
    - `/item/id` - get information about a specific item by id
- POST-request
    - `/users` - creates a new user to database
    - `/items` - creates a new item to database
- PUT-request
    - `/user/id` - modify a specific user by id
    - `/item/id` - modify a specific item by id
- DELETE-request
    - `/user/id` - delete a specific user from the database by id
    - `/item/id` - delete a specific item from the database by id

Payloads:
- POST-request (all of the listed attributes must be included)
    - `/users` - { username, email, password }
    - `/items` - { name, userid, onsale, price }
- PUT-request (one or more of the listed attributes may be included)
    - `/user/id` - { username, email, password, role }
    - `/item/id` - { name, userid, onsale, price }

## React and Redux
Implement using create-react-app
## Testing    
## Project timetable and division of work    
| Name   | Start  | End    | By who |
| ------ | ------ | ------ | ------ |
| Initial project plan          | 24.2. | 3.3.  | All    |
| Mongoose models               | 3.3.  | 6.3.  | Henri  |
| API paths and functionality   | 3.3.  | 10.3. | All    |
| cell                          | cell  | cell  | cell   |
| cell                          | cell  | cell  | cell   |

*Good luck and happy WWWdevvin’!*
