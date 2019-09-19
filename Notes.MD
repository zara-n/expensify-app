Before Webpack
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch;
live-server public

scripts/app.js compiled to on the fly by babel, from src/app.js 

WEBPACK:
When we run our app through webpack, we get a single javascript file back - "the bundle"
 -it will contain everything our application needs to run
  -dependencies
  -application code
it prevents us from writing multiple script & dependency request

(gulp & grunt are similar, but webpack is a bit different)

Webpack breaks down each all files in our application into own islands - which can communicate with one another via ES6 import & export syntax
 -which means we can create multiple files that can communcate with one another, e.g. calling a function in another file
  -this makes it more scalable
  -less messy, don't have all code in one giant script file

Can run babel for us (a transpiler)

Why is it a bad idea to install Global Modules?
 -package.json won't write all the dependencies that the application needs to be run
  -not ideal for collabs or open sourced
 -you must type it in the command line manually, for the module you want to use
 -all projects will have to use the same version of said module, which may not be ideal for each individual project (different versions of different modules may need to be run)

 STEP 1 (optional, if global dependencies are installed):
 uninstall global dependencies:
 e.g.
  yarn global remove 
  npm uninstall -g

  yarn global remove babel-cli live-server
  npm uninstall -g babel-cli live-server

STEP 2 (add dependencies local to project, that ends up in package.json)
e.g.
 yarn add live-server babel-cli@6.24.1
 npm i live-server babel-cli@6.24.1

 STEP 3 (we need to run those above dependencies, we need to be able to access babel)
 we can no longer access it from the terminal (e.g. babel, live-server)

 define "scripts" object in package.json to define all the scripts we want to run
 set up scripts inside obj   ect
  -key:value pair
  -"serve": "live-server public/" (runs entire script with just "serve")
  -it will use the locally installed live-server module as opposed the global one, like it did before.

e.g.
   "scripts": {
    "serve": "live-server public/",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react"
  },

  now will run with
  e.g.
    yarn run serve
    yarn run build

    npm run serve
    npm run build

STEP 4 
Install Webpack
e.g.
    npm install webpack@3.1.0
    yarn add webpack@3.1.0

Edit package.json file, under "scripts"

"build": "webpack"

Webpack can run Babel for you, so the above build-babel key is not necessary anymore (can wish to keep anyway)

A WEBPACK CONFIG FILE IS NECESSARY TO MAKE THE KEY "WEBPACK" DO SOMETHING
 -we must tell it how to work with our application

create a file called "webpack.config.js" - it MUST be in the root folder (e.g alongside package.json, yarn.lock etc) 
    - this is actually a node script
        - so you have access to everything you would have in a node.js application

    - NODE NOTES: It's just javascript


Config:
https://webpack.js.org/configuration/entry-context/#context

Node Paths:
https://nodejs.org/api/path.html#path_path_join_paths

__dirname: provides the path to the current location


CREATING / USING APP
Importing named exports: import { square } from './utils.js'; //importing a NAMED export from a file
Exporting named exports: export { square }; //NOT an object

OR (for same affect): Export as you define, in line exports: export const square = (x) -> x * x;


EXPORT DEFAULT (x as default):
export { z, y, x as default}; OR export default x;
OR: export default (a,b) => a - b; //just the expression, no function name required
import x {z, y} from './utils.js'

OR: can be inline for classes, not consts. 
e.g.
export default class AddOption extends React.Component {...}

The difference is that the name can be changed during the import, it will know what to reference to as it is the default export.

IMPORTING NODE MODULES:
install-import-use

install your module
check npm documentation on what imports are available and what sort of export it was (default or not etc)
e.g.

import validator from 'validator' 
when we provide just the name (and not ./'x'), Webpack looks for modules of the same name in the node_modules folder

Only when module is imported will Webpack use it, saving on performance.

REACT & REACT-DOM
install-import-use

install
e.g. 
yarn add react@16.0.0 react-dom@16.0.0
npm i react@16.0.0 react-dom@16.0.0
OR whatever version

import
e.g.
var React = require('require'); // popularized by node, it is an ES5 module syntax

NOTE:When looking at documentation you might have incosinstent module syntaxes in examples.

ES6 module syntax
import React from 'react';
import ReactDOM from 'react-dom';

e.g. 
const template = <p>testing 123</p>;
ReactDOM.render(template, document.getElementById('app'));
--> will throw ERROR without a loader in webpack.config because we are no longer using Babel to transform(transpile) our JSX, JavaScript does not know what to do and will crash.

THEORETICALLY WOULD USE:  React.createElement('p', {}, 'testing 123'); - but not ideal, Babel (transpiler) should be installed to convert it for us

SETTING UP BABEL (w/ Webpack)
yarn add babel-core@6.25.0 babel-loader@7.1.1 

babel-core (similar to babel-cli - which allows you to run Babel through the command line/terminal),it allows you to run babel through tools like webpack. By itself has no functionality, still needs to be configured with presets.

babel-loader is a webpack plugin, allows us to teach webpack how to run babel when it sees certain files

e.g. (webpack config)
loader: (how a file gets transformed when Webpack uses it)
test: what we want to run the loader on, only when they meet this criteria will we run babel through them
exclude: allows us to exclude a set of files

module: { 
       
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/, // $ means the file has to be .js
            exclude: /node_modules/ 
        }]
    }

.babelrc (json file that allows us to use babel presets):
-so whenever the project runs babel, it will use these presets (a collection of plugins)
{
    "presets": [
        "env",
        "react"
    ]
}

NOTE:
import React from 'react'; 
//just because there is no direct call to React does not mean that we dont have to use it
//All our code is going to be transpiled into React.CreateElements so if we don't have React in scope, then it will throw an error


SOURCE MAPPING:
Errors are usually referenced in bundle.js
Source mapping finds where the code is exactly

e.g.  add item in object module.exports in webpack config file
 devtool: 'cheap-module-eval-source-map' 

 Looks inside webpack documentation under Devtools for what source mapping options are available.

WEBPACK DEV SERVER:
Looks inside webpack documentation under DevServer for what options are available.
Instead of something like live-server 
It serves up the public folder (define in content base in example);

yarn add webpack-dev-server@2.5.1
npm i webpack-dev-server@2.5.1

package.json addition:
"dev-server": "webpack-dev-server" (does not create a bundle.js file, use build(webpack) command for that, for production)

e.g.  add item in object module.exports in webpack config file:
devServer: {
        contentBase: path.join(__dirname, 'public')
    }

ES6 CLASS PROPERTIES:

Individual plugin
babel plug in: babel-plugin-transform-class-properties@6.24

.babelrc file:

    "plugins": [
        "transform-class-properties"
    ]

The plug in removes the need for a constructor in a class, and the this binding:

class OldSyntax {
    constructor() {
        this.name = 'Mike';
        this.getGreeting = this.getGreeting.bind(this); // bound to the component instance
    }
    getGreeting() {
        return `Hi. My name is ${this.name}.`;
    }
}
const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting; //will break "this" binding, unless "this" is bound to the component instance
console.log(getGreeting());

//-------

class NewSyntax {
    //no constructor
    //no this
    name = 'Jen'; //no let, const, var
    getGreeting = () => {
        //arrow functions don't have their own "this" binding, they just whatever "this" binding is used in the parent scope
        //which in this case is the class instance
        return `Hi. My name is ${this.name}.`;
    }
}
const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting();
console.log(newGetGreeting);


THIRD PARTY REACT COMPONENTS:
e.g react-modal 
yarn add react-modal@2.2.2
check docs for usage (e.g. imports, syntax etc)


SCSS (Sass)
Setting up on webpack

https://www.npmjs.com/package/css-loader
https://www.npmjs.com/package/style-loader

e.g. css loader (allows webpack to load in css assets)
e.g. style loader (takes the css, and loads it to the DOM with a style tag)

yarn add style-loader@0.18.2 css-loader@0.28.4
npm i style-loader@0.18.2 css-loader@0.28.4

yarn add sass-loader@6.0.6 node-sass@4.5.3
npm i sass-loader@6.0.6 node-sass@4.5.3

add new rule to, in webpack config, array
test: /\.s?css$/, //makes the "s" optional
          use: [ //allows for multiple loaders
              'style-loader',
              'css-loader',
              'sass-loader'
          ]

scss files that start with "_" are partials (meaning that only part of our application styles are there)

@import './base/base';

cross browser consistency 
yarn add normalize.css@7.0.0
import 'normalize.css/normalize.scss';


MOBILE CONSIDERATION
in index.html:
<meta name="viewport" content="width=device-width, initial-scale=1">


REACT-ROUTER
*look at documentation

e.g. for web:
yarn add react-router-dom@4.2.2
npm i  react-router-dom4.2.2

import { BrowserRouter, Route, Switch } from 'react-router-dom' //examples, look at docs
add historyApiFallback: true to devServer in webpack config
telling it to go back to our index html during a 404, setting a default fallback

  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true //
  }

  EXAMPLE:

  const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpensePage} />
      <Route path="/edit" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFoundPage}/>
    </Switch>
  </BrowserRouter>
);

REDUX

yarn add redux@3.7.2
npm i redux@3.7.2


UUID
yarn add uuid

MOMENT & REACT DATES

yarn add moment@2.18.1 react-dates@12.7.0 react-addons-shallow-compare@15.6.0


REACT-REDUX DEV TOOLS EXTENSION

https://github.com/zalmoxisus/redux-devtools-extension

install extension then add second argument to create store configuration
e.g:

  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


TESTING
jest (best with react apps, as it is made my facebook)

yarn add jest@20.0.4
npm i jest@20.0.4

add test / jest command to scripts in package.json file

"scripts": {
"test": "jest"
}

Commands to run test
yarn run test
yarn test
npm test

add "--watch" to watch

it runs tests in src folder that have the ".test.js" extension
this extension provides all the imports/global variables/assertions etc

check docs for global variables that jest provides for us

SNAPSHOT TESTING
react-test-renderer

yarn add react-test-renderer@16.0.0
npm i react-test-renderer@16.0.0

E.G.
for shallow rendering (only renders the given component, whereas full DOM rendering renders child components)

import React from "react"; 
import ReactShallowRenderer from "react-test-renderer/shallow";
import Header from "../../components/Header";

test("should render Header correctly", ()=>{
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header/>);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})

--will create new snapshot of Header if one does not exist


ENZYME

yarn add enzyme@3.0.0 enzyme-adapter-react-16@1.0.0 raf@3.3.2
npm i enzyme@3.0.0 enzyme-adapter-react-16@1.0.0 raf@3.3.2

setting it up / usage

airbnb.io/enzyme ---> DOCS

setUpTests.js (in root of test folder)

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
});

CONFIGURING JEST

Option: setupFiles

Root file:
jest.config.json

{
    "setupFiles": [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
    ]
}

UPDATE PACKAGE JSON

  "scripts": {
    "test": "jest --config=jest.config.json"
  },

SHALLOW RENDERING / SNAPSHOT TESTING WITH ENZYME:
import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

test("should render Header correctly", ()=>{
    const wrapper = shallow(<Header/>);
    expect(wrapper).toMatchSnapshot();
})

ENZYME TO JSON 
so that snapshot and enzyme work together appropriately

yarn add enzyme-to-json@3.0.1
npm i enzyme-to-json@3.0.1

ADD to jest.config.json
so it uses the enzyme-to-json automatically (as seen in docs) instead of importing it (import toJSON from "enzyme-to-json"; e.g. (toJSON(wrapper)) )

"snapshotSerializers": [
        "enzyme-to-json/serializer"
    ]


MOCKS
Manual mocks are defined by writing a module in a __mocks__/ subdirectory immediately adjacent to the module. Note that the __mocks__ folder is case-sensitive, so naming the directory __MOCKS__ will break on some systems. Should be in the test folder.

E.g. we want to test moment, so since it will break snapshot tests using real time (since time is always changing and will never match snapshot)
 -we must use a mock call. We write create a "moment.js" file in within __mocks__ 

 "
  -const moment = require.requireActual("moment");

export default (timestamp = 0) => {
  return moment(timestamp);
};
"

read documentation of module you want to mock (to avoid stack trace errors, calling the module within the mock will look for the mock module just declared, hence the requireActual("moment") above)

JEST WILL AUTOMATICALLY CALL THE MOCK MODULE IF IT IS DIRECTLY ADJACENT TO ITS CORRESPONDING MODULE, otherwise you must manually put it in. 

OPTIMISING FOR PRODUCTION
Running webpack in production mode (can be found in webpack documentation)
Allows us to minify our JS code, with -p flag
sourcemap makes the project bigger / more memory

in package.json update:

   "build:dev": "webpack",
    "build:prod": "webpack -p",

changing WEBPACK CONFIG, depending on if it is running in production of developer mode:
changing module.export from exporting an object directly TO epxporting a function (which returns a the webpack config object when called)

-allows the exporting function to be called with some things (e.g. ENV (environment))

module.exports = (env) => {
  return {
      ...
  }

instead of
  module.exports = {
    ...
};

change package.json file to 
"build:prod": "webpack -p --env production", --- allows us to see if we are in production or not
it gives the env the value of "production" in webpack.config

CHANGE (in webpack config)
devtool: "cheap-module-eval-source-map", 

TO
devtool: isProduction ? 'source-map' : "cheap-module-eval-source-map", 
//the above "source-map" is slow to build and is better suited for production, going to create an external file which will only open when someone opens dev tools


SEPERATING CSS FILES IN BUILD

DOCS FOR PLUGIN WE WILL BE USING:
extract-text-webpack-plugin

yarn add extract-text-webpack-plugin@3.0.0
npm i extract-text-webpack-plugin@3.0.0

add the require to webpack config, for the plugin

const ExtractTextplugin = require("extract-text-webpack-plugin");

in module exports, within the webpack config, create a new instance of the plugin
const CSSExtract = new ExtractTextplugin("styles.css"); //name of the file we want the css to be extracted to

Change the rules to the following, and redefine "use":
{
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: ["css-loader", "sass-loader"]
          })
}

Pass the CSSExtract value to the plugins area:

    plugins: [
      CSSExtract
    ], 


TO ENSURE THE STYLES GET LOADED TO THE PROJECT, edit index.html and add:
<link rel="stylesheet" type="text/css" href="/styles.css"/>


SOURCEMAP CHANGE FOR DEVELOPMENT:
devtool: isProduction ? "source-map" : "inline-source-map", //inline one is more ideal for dev, it is slower however, subject to opinion and change

ENABLE SOURCEMAP FOR THE CSS & SASS LOADER:
css-loader, and sass-loader sourcemap options for webpack can be found in webpack documentation. 
By default the sourcemaps are disabled by default, to enable for friendlier development build, change "use" in webpack config as below:

          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                option: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })

CREATING EXPRESS SERVER
Create new file/folder in root of the project
"Server.js" (within a server folder)

expressjs.com for documentation 

e.g.
yarn add express@4.15.4
npm i express@4.15.4

RUNNING SERVER:
node server/server.js



HEROKU
After making free account

Install CLI
https://devcenter.heroku.com/articles/heroku-cli

check if installed: heroku --version

heroku login

heroku create -name- //or whatever name

creates a heroku remote to git, so we can deploy
check with git remove (-v for verbose version)

We need to tell Heroku how to run our Node server
add to package.json, to the list of scripts

 "start": "node server/server.js"

 Then server.js listen/output cannot be a static one
 Heroku provides a environment variable:

const port = process.env.PORT || 3000; //if port not found, then use static

app.listen(port, ()=>{
    console.log("Express server running ")
}); //port express is going to use

Teaching Heroku to run webpack:
Add to package.json scripts:

    "heroku-postbuild": "yarn run build:prod" //our webpack production mode command


Add to .gitignore (at root folder):

node_modules/
public/bundle.js
public/bundle.js.map
public/styles.css
public/styles.css.map


git push heroku master //to push to heroku 

heroku open

(https://expensify-zara.herokuapp.com/)

Heroku doesn't use all our dependencies (e.g. local ones such as our testing suites)

"--dev" at the end of commands
Dev Dependencies

  "devDependencies": {
    "enzyme": "3.0.0",
    "enzyme-adapter-react-16": "1.0.0",
    "enzyme-to-json": "3.0.1"
  }

Seperate dist folder in public folder, to put our compiled files
Update where file directories being used: e.g.:
    <script src="/dist/bundle.js"></script>

Update Webpack config:

output: {
      path: path.join(__dirname, "public", "dist"), //the absolute path where we want to put our bundle file, not allowed to use "./"
      filename: "bundle.js"
    },

Add to  the devServer within Webpack config (look at docs for devServer / public path for more info)

     publicPath: "/dist/"


NUMERAL JS
A js library to format number values, e.g. currency
Similar to moment, but for numbers
e.g 12000000 -> 1.2 mil

yarn add numeral@2.0.6

import numeral from "numeral"


ADDING FIREBASE // Realtime Database

firebase.google.com

follow instructions (create project -> realtime firebase -> web app)

Adding firebase to yoru app:

e.g.
yarn add firebase@4.2.0
npm i firebase@4.2.0

creating folder in src folder: "firebase"
creating file in firebase folder: "firebase.js"


REDUX THUNK - redux middleware
yarn add redux-thunk@2.2.0
npm i redux-thunk@2.2.0

add "applyMiddleware" to redux import in configureStore

import { createStore, combineReducers, applyMiddleware } from "redux";

&
import thunk from "redux-thunk";

Allows for startAddExpense (look at expenses.js) to return a function


TESTING REDUX / ASYNC REDUX ACTIONS

MOCK STORE
module: redux-mock-store
docs - https://github.com/dmitry-zaets/redux-mock-store

yarn add redux-mock-store@1.2.3
npm i redux-mock-store@1.2.3

import configureMockStore from "redux-mock-store"

//supports the same API that a regular redux store does

Environment variable, to see what environment the application is in (production, development, testing etc), there is no cross OS way of doing it without downloading an NPM package: cross-env

e.g.
 yarn add --dev cross-env@5.0.5 // dev because we are only adding to our development 
 npm install --save-dev cross-envv@5.0.5


Integrating to our package.json test SCRIPT, add "cross-env NODE_ENV=test" in front:

"test": "cross-env NODE_ENV=test  jest --config=jest.config.json",

Production environment variable is provided by Heroku.
Development environment variable is missing, so we know the one without it is in Development.

To then take advantage of our new variable, we add the following to webpack.config.js:

process.env.NODE_ENV == process.env.NODE_ENV || "development"; //if none found then it is in development mode

Making two seperate files, one for test & dev (excluded from git repo)
.env.test
.env.development


NPM dotenv - reads environment files (.env)

e.g. yarn add --dev dotenv@4.0.0

RESULT:

if (process.env.NODE_ENV === "test") {
  require('dotenv').config({ path: '.env.test'});
} else if (process.env.NODE_ENV === "development") {
  require('dotenv').config({ path: '.env.development'});
} 


Node environment variables (in our webpack config) are not sent to our client side due to security risks, where private environment variables being exposed. 

They need to be manually passed down to our client side javascript.

webpack has inbuilt plugin for that:
In webpack config import webpack: const webpack = require("webpack");
Add to "plugins":

new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
        ---
        ---
})
one for each value needed to be passed down


then firebase.js config needs to be updated to reflect those variables

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

Then setupTests.js is updated (file created by setting up enzyme for react 16) by adding the following lines:

import DotEnv from 'dotenv'
DotEnv.config({ path: '.env.test'});

Heroku Config
The above env variables need to be used in Production (which needs to be done in HEROKU)
Heroku automatically sets node_env to "production"
But the variables need to be set.

Setting it from .env.development

COMMAND LINE
heroku config:set KEY=value
heroku config:unset KEY
heroku config (too see all set key value pairs)

heroku config:set FIREBASE_API_KEY="" FIREBASE_AUTH_DOMAIN="" FIREBASE_DATABASE_URL=https://expensify-3e7cc.firebaseio.com FIREBASE_PROJECT_ID=expensify-3e7cc FIREBASE_STORAGE_BUCKET=expensify-3e7cc.appspot.com FIREBASE_MESSENGING_SENDER_ID=236142290934 FIREBASE_APP_ID=1:236142290934:web:2ee9965b02c89b6b

add the .env files to .gitignore:
.env.test
.env.development



GOOGLE AUTHENTICATION
go to Firebase console, authentication and enable google.

Setting up functionality to authentication
inside firebase.js we need an instance of a "Provider" -  provides authentication.

We need a Google Provider, in firebase.js:
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default }; //exporting it as a named export


One would use GitHub auth for github, facebook auth for facebook and so on and so forth

DOCUMENTATION: https://firebase.google.com/docs/auth/web/google-signin


Then in app.js

import {firebase} from './firebase/firebase'; 

firebase.auth().onAuthStateChanged(()=>{

});

Instead of making a firebase call directly inside of a Login Page, better to make a new actions file:

create auth.js in actions folder - inside of here we will make firebase calls

NPM HISTORY
React Router uses this, however in some cases we need to use it manually (outside of component scopes).

npm install history@4.7.2 
yarn add history@4.7.2 

in AppRouter.js

import createHistory from "history/createBrowserHistory";
import { Router, Route, Switch } from "react-router-dom";

export const history = createHistory();

Replace <BrowserRouter> //uses history by default, built in
With <Router > //we pass history in, and can provide our own history value, custom history

And now we can use it in app.js
import AppRouter, { history } from "./routers/AppRouter";

NEW REDUCER FOR AUTH necessary for more in depth authorisation
auth.js


MAKE FIRBASE DATABASE PRIVATE

https://firebase.google.com/docs/storage/security/user-security

In RULES of database:

{
  "rules": {
    ".read": false,
    ".write": false,
      "users":{
        "$user_id": {
          ".read": "$user_id === auth.uid",
          ".write": "$user_id === auth.uid"
        }
      }
  }
}

Can be tested in simulator

DATA VALIDATION SERVER SIDE: //in firebase rules

firebase database security/validation rule:
https://firebase.google.com/docs/reference/security/database

EXAMPLE:
{
  "rules": {
    ".read": false,
    ".write": false,
    "users": {
      "$user_id": {
        ".read": "$user_id === auth.uid",
        ".write": "$user_id === auth.uid",
        "expenses": {
          "$expense_id": {
            ".validate":
              "newData.hasChildren(['description', 'note', 'amount', 'createdAt'])",
            "description": {
              ".validate": "newData.isString() && newData.val().length > 0"
            },
            "note": {
              ".validate": "newData.isString()"
            },
            "amount": {
              ".validate": "newData.isNumber()"
            },
            "createdAt": {
              ".validate": "newData.isNumber()"
            },
            "$other": {
              ".validate": false
            }
          }
        },
        "$other": {
          ".validate": false
        }
      }
    }
  }
}

FINAL FIREBASE AUTHORISATION

Any domains that need access to the database must be added to the Authorized Domains list in the firebase console.

E.g. Heroku hosted website
https://expensify-zara.herokuapp.com

BABEL POLYFILL

Fixes stuff that babel did not transpile for browsers that cannot support said stuff

EXAMPLE:

[].include("String") // old browsers (like ie 11) do not support this

npm install --save babel-polyfill@6.26.0
yarn add babel-polyfill@6.26.0

UPDATE webpack.config.js file

add "babel-polyfill" to "entry"

You can have an array of strings under "entry":
    entry: ["babel-polyfill", "./src/app.js"]

