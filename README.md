# Video Game Site
Based loosely on Epic Games Store in terms of design.
This project was created as part of my University practice period where I chose to learn the React framework along with the PERN stack.
The site's functionality is mainly based on CRUD operations that can only be accesed by the admin account. It showcases various games in different categories and assigns a unique page and URL for each one.


# Functionality showcase
https://github.com/Pavel-Gherciu/Video-Game-Site/assets/62070101/bfe0afff-c96d-4f9a-af47-33e5c785a8be

# Setup guide
First for the client as usual for a React app you must initialize the app with npm init and install all the modules using npm install. After that npm start should start the local server.

For the server folder, you also must do the above except for starting the local server. This folder contains the database in the form of the file "games.sql". This file must be imported into your local PostgreSQL app and the databse started.
In order to make the backend start, you must write the command "nodemon index" after initialising and installing all the rest.
