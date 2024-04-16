// Import bcryptjs for password hashing, allowing for secure password storage.
const bcrypt = require('bcryptjs');
// Import jsonwebtoken for creating JWTs, which are used for secure user authentication.
const jwt = require('jsonwebtoken');
// Import the User model to interact with the User collection in the MongoDB database.
const User = require('../models/User');
// Import configuration settings, including the JWT secret used for signing tokens.
const config = require('../config/config');

// Export the registerUser function to be used as a route handler for user registration.
exports.registerUser = async (req, res) => {
  // Destructure username, email, and password from the request body.
  const { username, email, password } = req.body;
  try {
    // Check if a user with the given email already exists in the database.
    let user = await User.findOne({ email });
    // If the user exists, return a 400 status code with an error message.
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // If no existing user is found, create a new user instance with the provided details.
    user = new User({
      username,
      email,
      password
    });

    // Generate a salt using bcrypt to hash the password, enhancing security.
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt and overwrite the plaintext password.
    user.password = await bcrypt.hash(password, salt);

    // Save the new user to the database.
    await user.save();

    // Create a payload for the JWT that includes the user ID.
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign the JWT with the provided secret and set an expiration.
    jwt.sign(payload, config.jwtSecret, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      // Respond with the JWT token upon successful registration.
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    // Return a 500 status code if an error occurs, indicating a server error.
    res.status(500).send('Server Error');
  }
};

// Export the authenticateUser function to be used as a route handler for user authentication.
exports.authenticateUser = async (req, res) => {
  // Destructure email and password from the request body.
  const { email, password } = req.body;
  try {
    // Attempt to find the user by email.
    let user = await User.findOne({ email });
    // If no user is found, return a 400 status code with an error message.
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Use bcrypt to compare the provided password with the hashed password stored in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    // If the passwords do not match, return a 400 status code with an error message.
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create a payload for the JWT that includes the user ID.
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign the JWT with the provided secret and set an expiration.
    jwt.sign(payload, config.jwtSecret, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      // Respond with the JWT token upon successful authentication.
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    // Return a 500 status code if an error occurs, indicating a server error.
    res.status(500).send('Server Error');
  }
};


//  @route   POST api/auth/register
// @ts-check 
