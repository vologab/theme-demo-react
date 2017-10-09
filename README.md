# Parse + React Demo

### [Demo](https://demo-parse-react.herokuapp.com)

## Features
#### Data Synchronization
Across users, tabs and even browsers  
![](https://user-images.githubusercontent.com/584632/30557234-4516c52a-9cb6-11e7-9a3e-dcef2b18de80.gif)

#### [Angular 4 Demo](https://github.com/BeKitzur/theme-demo-angular/)
#### [Also check shared Parse Server repo](https://github.com/BeKitzur/theme-demo-server/)

### Back-End
<a href="https://github.com/parse-community/parse-server"><img src="https://user-images.githubusercontent.com/584632/30557464-04175a66-9cb7-11e7-957a-f82bad3df497.png" width="200"/></a>  

### Front-End
| <a href="https://github.com/facebook/react"><img src="https://user-images.githubusercontent.com/584632/31338909-ba81af56-ad09-11e7-875b-553ddb0c6c2d.png" width="100"/></a><br/><br/><a href="https://github.com/facebook/react">React</a> | <a href="http://redux.js.org/"><img src="https://user-images.githubusercontent.com/584632/31338917-c6ed8a80-ad09-11e7-8f10-5202bcea1fa9.png" width="100"/></a><br/><br/> [Redux](http://redux.js.org/) | <a href="https://github.com/reactjs/react-router-redux"><img src="https://user-images.githubusercontent.com/584632/31339435-88c4845a-ad0b-11e7-8286-b1a935f59fd4.png" width="100"/></a><br/><br/><a href="https://github.com/reactjs/react-router-redux">React Router</a> | <a href="https://material-ui-1dab0.firebaseapp.com/"><img src="https://user-images.githubusercontent.com/584632/31339652-3f64c58a-ad0c-11e7-8fb3-c5a5363b3abe.png" width="100"/></a><br/><br/><a href="https://material-ui-1dab0.firebaseapp.com/">Material-UI</a> |
|---|---|---|---|

## Installation
```bash
npm install
```

## Configuration
```bash
cp .env.example .env
```
Change corresponding variables:

```
# define node path for absolute imports
NODE_PATH=src/ 

# Parse configuration
REACT_APP_APP_ID=devAppId  #Application ID
REACT_APP_SERVER_URL=https://demo-parse-server.herokuapp.com/parse #Server URL
REACT_APP_LIVE_QUERY_SERVER_URL=wss://demo-parse-server.herokuapp.com/parse #Live query URL

# Google Client ID for authentication via Google, see https://developers.google.com/identity/sign-in/web/devconsole-project
REACT_APP_GOOGLE_CLIENT_ID=
```

## Build
```bash
npm run build
```

## Development
Start Parse server. Required running MongoDB service.
```bash
npm run api
```

Start Front-End client in another terminal. 
```bash
npm run start
```
