To Run Locally
--------------

1) Open a command prompt in the project's root directory (APM)

2) Type: `npm install`
    This installs the dependencies as defined in the package.json file.
    
3) Type: `npm start`
    This launches the TypeScript compiler (tsc) to compile the application and wait for changes. 
    It also starts the lite-server and launches the browser to run the application.

To Build
--------

npm shrinkwrap

npm-bundle

npm start

To run using Boxfuse
--------------------

In Virtual Box:

boxfuse run

In AWS:

To run server using node, passing environment name, and port as environment variables
-------------------------------------------------------------------------------------

BOXFUSE_ENV=test PORT=8080 node server.js


Required Packages
-----------------

npm install typings --global