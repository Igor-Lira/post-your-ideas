# Post Your Ideas!

<img src="https://github.com/Igor-Lira/Igor-Lira/blob/main/public/post-your-ideas-banner.jpg" width="600px" />

        video demo: https://www.youtube.com/embed/Tfnzh2fxGw8

## Project description

        This full-stack project allows users to post texts with images to share
        their thoughts (similar to Twitter). The user may log in to create, edit
        and delete posts. All posts are available for the community to see.
        
        The client-side consists of three main views: the login page, the post's
        timeline, and the formulary for creating and editing posts.
        
        The server handles CRUD requests for users and posts supported by a
        NoSQL database.

## About this project

        I developed this project when I took a full-stack Udemy course.

        The server is set up with NodeJs, Express and MongoDB to store users and
        post information. I created the database schemas with Mongoose because
        it includes built-in type casting, validation and query building. The
        server interacts with the database with CRUD (Create, Read, Update and
        Delete) commands for User and Post models. I learned more about some
        core concepts of web development: Authentication, authorization, and
        pagination. Authentication to create tokens to check if a user is logged
        in and is enabled to create posts. Authorization to check if the
        logged-in user has permission to edit or delete a post. Pagination
        avoids loading too many posts of a large dataset by adding limit and
        offset in requests.

        On the client side, I created the core components and views with
        Angular, and to increase productivity, I used the Angular material
        design. Also, I implemented the logic to display the buttons (Create,
        Edit, Delete) and Pages (Login, Log Out) according to the user
        authorization and authentication.

## Project setup

Install the dependencies:

`npm run install`

Run the front-end:

`npm run start`

Run the backend:

`npm run start:serve`
