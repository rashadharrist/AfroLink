// Import the express module to utilize the Express framework. Express provides a robust set of features to develop web and mobile applications.
const express = require('express');

// Create a new router instance. Routers allow you to define routes in a modular fashion by attaching them to instances of express.Router, making your route definitions cleaner and more modular.
const router = express.Router();

// Import the functions listBusinesses, createBusiness, and addReview from the businessController module. These functions are designed to handle the logic for their respective routes, including interacting with the database and returning responses to the client.
const { listBusinesses, createBusiness, addReview } = require('../controllers/businessController');

// Define a GET route for the root path '/'. This route is handled by the listBusinesses function, which is responsible for retrieving and returning a list of all businesses in the application.
router.get('/', listBusinesses);

// Define a POST route for the root path '/'. This route is handled by the createBusiness function, which is responsible for creating a new business with the data provided in the request body and adding it to the database.
router.post('/', createBusiness);

// Define a POST route for adding a review to a specific business. The route path includes a parameter ':id', which represents the unique identifier of the business to which the review is being added. The addReview function handles the logic for creating a new review and associating it with the specified business.
router.post('/:id/reviews', addReview);

// Export the router instance. This allows the defined routes to be imported and used in other parts of the application, such as the main server file, thereby integrating them into the application's route handling mechanism.
module.exports = router;
