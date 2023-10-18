### Node.js web application using MySQL database

This application is a dashboard for admins of a community-based web application. Below are the functionalities of the application.

- Register/Change/Delete staff 
- Register/Update/Delete customers 
- Show all customers 
- Show all data & reports for a customer 
- Add a new report about a customer

I have used SQL as the database, and the SQL script is named cbo_app.sql. https://www.phpmyadmin.net/ can be used to run the SQL script locally, or it can be run in an SQL docker image.

Further, I have included the Dockerfile used to create the image of the node.js web application in a containerized environment.

Steps to run the application

Create the SQL database in an SQL server using the cbo_app.sql script.
Open the terminal in the CBO-nodejs.
Run the npm start command to run the application locally.
The CBO app is now running in port 3000 in the local host.
Navigate to http://localhost:3000/ in the browser.