This is a backend server using Node.js & Express to handle our Personal Finance APIs.

Server is live & deployed using render.com, below is the URL to test it:
https://personal-finane-mabdalbaqi.onrender.com

How to use on development environment:

clone the repo:
gh repo clone Scouser8/Personal-Finance-Server

or visit the repo below & do it manually:
https://github.com/Scouser8/Personal-Finance-Server

npm install (to install all dependencies) node server.js OR nodemon start (Running the server)

Modules & tools used:

Express for easy app creation & middlewares
Mongoose for communicating with our MongoDB on Atlas
MongoDB Atlas to have our live free database
bcrypt for encrypting password before pushing it to the database
body-parser for reading request body
jwt for web tokens (Althought it's still not really effective as it only creates a token for the user, however what's left is to check if the token is valid & not expired on each request)