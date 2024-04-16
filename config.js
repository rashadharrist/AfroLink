// Require the dotenv package to load environment variables from a .env file into process.env
const dotenv = require('dotenv');
// Call the config function on dotenv to load the environment variables
dotenv.config();

// Export an object that contains configuration details for the application
module.exports = {
  // mongoURI: The URI connection string for MongoDB, loaded from an environment variable
  mongoURI: process.env.MONGO_URI,
  // jwtSecret: A secret key for JWT (JSON Web Tokens) to sign or verify the tokens, loaded from an environment variable
  jwtSecret: process.env.JWT_SECRET
};
