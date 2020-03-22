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
Henri Hakkarainen, 434896, henri.hakkarainen@tuni.fi<br>
Niki Väänänen, 428612, niki.vaananen@tuni.fi

Gitlab repo URL: https://course-gitlab.tuni.fi/tieta12-2019-2020/internal-server-error.git

## How to run the project application
First of all, modify the Vagrantfile used so that it forwards also port 3001 which is reserved for React in this project. Add the following line to Vagrantfile under "Open ports" part:

- config.vm.network "forwarded_port", guest: 3001, host: 3001   # React

Next step:

Copy `.env.dist` in the root with the name `.env` (note the dot in the beginning of the file). This can be done on terminal with:

`$ cp -i .env.dist .env`

**Obs:** If `.env`-file already exists, do not overwrite it!

**Note:** Do not modify `.env.dist` file. It is a model to be copied as .env, it neither must not contain any sensitive data!

Also copy `.env.react` in the root with the name `.env` to directory frontend. This makes it that React complies automatically when changes are made to the React code on the local machine. You can use the following command:

`$ cp -i .env.react frontend/.env`

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
![picture of navigation](./documentation/navigation.png)
## Modules your group created in your Node project
```
├── backend
│   ├── app.js                  --> express app
│   ├── router.js               --> main router that setups other routes
│   ├── package.json            --> app info and dependencies
│   ├── controllers             --> control the application behaviour
│   │   ├── item.js             --> functions for item handling
│   │   ├── payment.js          --> functions for payment handling
│   │   └── user.js             --> functions for user handling
│   ├── models                  --> models that reflect the db schemas
│   │   ├── creditcard.js       --> hold data about credit cards
│   │   ├── item.js             --> hold data about items
│   │   └── user.js             --> hold data about users
│   ├── routes                  --> a dir for router modules
│   │   ├── items.js            --> /items router
│   │   ├── payments.js         --> /payments router
│   │   └── users.js            --> /users router
│   ├── setup                   --> setup on startup
│   └── └── createusers.js      --> create admin user for the database
│
├── frontend
│   ├── src                     --> all react and redux files
│   │   ├── index.js            --> react app and store creation
│   │   ├── actions             --> action creators
│   │   ├── components          --> react presentational components
│   │   │   ├── ...
│   │   │   └── ...
│   │   ├── containers          --> container components
│   │   ├── constants           --> redux constants
│   │   ├── reducers            --> redux reducers
│   │   └── store               --> redux store config
│   ├── public                  
└── └── package.json            --> app info and dependencies

```
## Mongo database and Mongoose schemas
Models we're planning to use and their attributes:
- User
    - Name (String)
    - Email (String)
    - Password (String)
    - Role (String) [admin/shopkeeper/normal]
    - CreditCard (Creditcard)
- Item
    - Name (String)
    - Owner (User)
    - Price (Number)
    - Description (String)
    - Onsale (Boolean)
- Creditcard
    - Number (String)
    - Balance (Number)

The system holds information about the items that have been saved to the database and also about users that are buying or selling items. Item is saved the first time it is listed to being sold and a user is created the moment they register at the website.<br><br>
User model contains a username, email and password. User model also has a role, which defaults to normal (registered) user so that the user is able to buy listed items and sell items to the shopkeepers on the webstore. User can be promoted to shopkeeper role (requires admin rights) and that role is able to sell items to all other customers (these offers are listed on the store for everyone). Admin users can edit basically anything. User model also has an attribute list of offers, which holds items that the user is currently selling on the store.<br><br>
Item model contains name of the item and the current owner of the item, which points to a user (each item belongs to some user). Item model also has attribute that holds information if the items is currently on sale or not (true/false). There is also an optional description field, where the item can be described with more detail. If the item is on sale, it also must have price attribute set (price must be >= 0).<br><br>
Credit card / bank account information is modeled so that the Creditcard model contains number of the credit card and the balance of the card (how much money there is on the corresponding bank account). This model is being kept quite simple and straightforward on this imaginary webstore environment. On a real life application it would of course not be a good idea to keep track of a users bank account information and the payment would require authentication into a specific payment site.
<br><br>
If a user unregisters from the webstore (= user is deleted from database), all items that he/she owns are also removed from the database along with the credit card / bank account information of that user.

## API
This documentation may still change a little during the coursework if more API paths are found to be needed or some changes must be done.

Base API path: http://localhost:3000/api

API endpoints:
- GET-request
    - `/users` - list all users from the database
    - `/users/id` - get information about a specific user by id
    - `/items` - list all items from the database
    - `/items/id` - get information about a specific item by id
    - `/items/users/id` - list all items that belong to a specific user
    - `/items/users/id/offers` - list all items that belong to a specific user and are listed for sale
    - `/items/onsale` - list items that are owned by shopkeepers and are listed for sale
    - `/items/offers` - list items that are owned by normal users and are listed for sale
    - `/payments` - list all payment information from the database
    - `/payments/id` - get information about a specific credit card item by id
- POST-request
    - `/users` - creates a new user to database
    - `/items` - creates a new item to database
    - `/payments` - create a new credit card item to database
    - `/purchase` - item changes owner and money transfers between credit cards
- PUT-request
    - `/users/id` - modify a specific user by id
    - `/users/id/role` - modify a specific user by id (including role - for admins only)
    - `/items/id` - modify a specific item by id
    - `/payments/id` - modify a specific credit card item by id
- DELETE-request
    - `/users/id` - delete a specific user from the database by id
    - `/items/id` - delete a specific item from the database by id
    - `/items/users/id` - delete all items that belong to a specific user
    - `/payments/id` - delete a specific creditcard item from the database by id

Payloads:
- POST-request (all of the listed attributes must be included)
    - `/users` - { username, email, password }
    - `/items` - { name, price, description, owner }
    - `/payments` - { number, owner }
    - `/purchase` - { sellerCCid, buyerCCid, itemId }
- PUT-request (one or more of the listed attributes may be included)
    - `/users/id` - { username, email, password, ccid } | *cc = credit card\**
    - `/users/id/role` - { username, email, password, role }
    - `/items/id` - { name, owner, description, onsale, price }
    - `/payments/id` - { balance }

## React and Redux

Implement using create-react-app. Inital plan is to start with getting the item listing page done first, then add login and purchase views. React and Redux should be done simultaneously. We will use https://material-ui.com/ for different components for the site: navigation, surfaces, sidebars, buttons etc.

We use Rails-style code structure which has separate folders for actions, constants, reducers, containers, store, and components. 
https://github.com/reduxjs/redux/blob/master/docs/faq/CodeStructure.md

## Testing 

We will move on to testing once all the backend and frontend work is done. Testing will be done using Chai and Mocha. React testing with Jest and React testing library.

## Project timetable and division of work  

| Name   | Start  | End    | By who |
| ------ | ------ | ------ | ------ |
| Initial project plan          | 24.2. | 3.3.  | All    |
| Mongoose models               | 3.3.  | 6.3.  | Henri  |
| API paths and functionality   | 3.3.  | 10.3. | All    |
| Start on frontend             | 10.3  | 20.3  | All    |

## Our implementation

In this section we discuss how our marketplace functions.

### Main page

![main view](./documentation/mainview.PNG)
This is our landing page, where all onsale items by shopkeepers are displayed. From this page the user can register or login with their account details. Items can be sorted by name or price in ascending or descending order.

![register](./documentation/register.PNG)<br><br>
Register view.<br><br>
![login](./documentation/login.PNG)<br><br>
Login view.<br><br>

### Normal user view

![createitem](./documentation/createitem.PNG)<br><br>
![updatetem](./documentation/updateitem.PNG)<br><br>
Once logged in, you can add new items or update owned items from the Sell items tab.<br><br>

![accountinfo](./documentation/accountinfo.PNG)<br><br>
From the Account information tab the user can edit his information, add credits, add or delete credit card or unregister from the service. <br><br>
![editinfo](./documentation/editinfo.PNG)<br><br>
User can change all his information.
![unreg](./documentation/unreg.PNG)<br><br>
If the user chooses to unregister all information will be deleted, including all the users items.<br><br>

### Shopkeeper view

![skbuy](./documentation/skbuy.PNG)<br><br>
The shopkeeper has a Onsale tab, where he can buy items offered buy users. Shopkeeper can see the item name, price, description and the name of the user who is selling the item.<br><br>
![skbuy2](./documentation/skbuy2.PNG)<br><br>
Once the shopkeeper clicks buy, he is confronted with a confirmation message that must be accepted before the transaction is complete.<br><br>

### Admin view

#### User management
![adminusers](./documentation/adminusers.PNG)<br><br>
Logged in as admin, you can view all the users in the marketplace from the users tab.<br><br>
![adminupdate](./documentation/adminupdate.PNG)<br><br>
Admin can update any users name, email, password or role. Admin can also delete any user.<br><br>
![adminnewuser](./documentation/adminnewuser.PNG)<br><br>
Admin can create a new user. 

#### Item management
![adminlisting](./documentation/adminlisting.PNG)<br><br>
From the all items tab, the admin can view all the items in the marketplace. Admin can change the item sale state.<br><br>
![adminitems](./documentation/allitems.PNG)<br><br>
 The admin can update or delete the items.<br><br>
![admincitem](./documentation/admincitem.PNG)<br><br>
The admin can also create a new item to the marketplace and assign it to any of the users. <br><br>

## Future additions
Things we didn't have time for but would be awesome!
- Tests
- Ability to add pictures for a item or user
- Bidding feature

*Good luck and happy WWWdevvin’!*
