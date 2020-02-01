# TodoistIntegration

Env for debugging and testing of Todoist Slack Integration

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)

# Getting started
- Clone the repository
```
git clone https://github.com/ShellyDCMS/TodoistIntegration.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```

- Build and run the project
```
npm run build
npm start
```

## Testing
For this project, I chose [Jest](https://facebook.github.io/jest/) as our test framework.
While Mocha is probably more common, Mocha seems to be looking for a new maintainer and setting up TypeScript testing in Jest is wicked simple.

### Install the components
To add TypeScript + Jest support, first install a few npm packages:
```
npm install -D jest ts-jest
```

`jest` is the testing framework itself, and `ts-jest` is just a simple function to make running TypeScript tests a little easier.

### Running tests
Simply run `npm run test --coverage`.
Note this will also generate a coverage report.

### Registering at Todois
You  have to register an application at https://developer.todoist.com/appconsole.html and 
set the OAuth redirect URL to <your app url>/oauth/redirect.
Copy the APPLICATION_ID and APPLICATION_SECRET into the .env file:
(SERVER = <your app url>)
```
SERVER=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
APPLICATION_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
APPLICATION_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
