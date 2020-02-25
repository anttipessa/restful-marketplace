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
## Mongo database and Mongoose schemas    
## API
## React and Redux
Implement using create-react-app
## Testing    
## Project timetable and division of work    
| Name | Start | End | By who |
| ------ | ------ | ------ | ------ |
| Initial project plan   | 24.2   | 3.3   | All   |
| cell   | cell   | cell   | cell   |
| cell   | cell   | cell   | cell   |

*Good luck and happy WWWdevvin’!*
