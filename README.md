An implemented API that provides a CRUD interface for working with companies and their associated contacts.

# Key Features
* Authentication.
* Automatic tests
* API documentation (/api-docs)

# How to use it?
* Install modules: npm install
* Before launch the app, write password of your postgres user in config/db.config file for PostgreSQL connection.
* Run a project: npm start
* Registration user - POST (/auth/signup)
* Authorization user - POST (auth/signin)
* Check available API - /api-docs
* Run a project: npm start
* Before launch tests, paste token of your registered user in test/company.js file
* Run a tests: npm test

# The Stack
* Node.js
* Express.js
* PostgreSQL
* Mocha && Chai
* Swagger
