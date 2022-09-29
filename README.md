# Post Your Ideas!

## Project description

Post your ideas is a Single Page Application that allows people to create posts with an image on a social network. The user may create an account to be able to create, edit and delete posts while they can see other users' posts.
This repository contains the front-end application consisting of three main views: the login page, the post's timeline, and the formulary for creating and editing pots. On the other hand, the backend has CRUD for users and post routes and a NoSQL database connection.


## About this project

I developed this project in a full-stack Udemy course. The technologies used for building the application were Angular in the front end and NodeJs in the backend, using MongoDB as a database to store user and post information.

I learned some core web development concepts, such as the authentication of clients to check if they are logged in or not and authorization to check if a user has the right to edit or delete a post (that could not be theirs). Moreover, pagination is an elegant way to avoid loading too many posts on a large dataset.

Which concerns the technologies, Angular has the Injection Dependency approach for each service used in the components, also a static typing that allows a more clean and secure coding process. Mongoose is an easy way to create database schemas for MongoDB and apply some queries for CRUD requisitions.

## Project setup

Install the dependencies:

`npm run install`

Run the front-end:

`npm run start`

Run the backend:

`npm run start:serve`
