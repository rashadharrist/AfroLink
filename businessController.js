// Import the Business model to interact with the Business collection in the MongoDB database.
const Business = require('../models/Business');

// Function to list all businesses stored in the database, sorted by their creation date in descending order.
exports.listBusinesses = async (req, res) => {
  try {
    // Use Mongoose's find method to retrieve all business documents, sorting them by the createdAt field in descending order.
    const businesses = await Business.find().sort({ createdAt: -1 });
    // Send the retrieved list of businesses as a JSON response.
    res.json(businesses);
  } catch (err) {
    // Log any errors that occur during the operation.
    console.error(err.message);
    // Send a 500 status code response indicating a server error.
    res.status(500).send('Server Error');
  }
};

// Function to create a new business entry in the database.
exports.createBusiness = async (req, res) => {
  // Destructure necessary fields from the request body.
  const { name, description, category, location, contact } = req.body;
  try {
    // Create a new Business document instance with the provided details, including the owner field, which is assumed to be set by JWT middleware.
    const newBusiness = new Business({
      owner: req.user.id, // Assuming JWT middleware sets req.user
      name,
      description,
      category,
      location,
      contact
    });

    // Save the new Business document to the database.
    const business = await newBusiness.save();
    // Respond with the newly created business document.
    res.json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Function to add a review to an existing business.
exports.addReview = async (req, res) => {
  // Destructure the rating and comment from the request body.
  const { rating, comment } = req.body;
  try {
    // Find the business document by its ID, which is passed as a route parameter.
    const business = await Business.findById(req.params.id);
    // Construct a new review object, assuming req.user.id is set by JWT middleware.
    const newReview = {
      user: req.user.id, // Assuming JWT middleware sets req.user
      rating,
      comment
    };

    // Add the new review to the reviews array of the business document.
    business.reviews.push(newReview);
    // Save the updated business document to the database.
    await business.save();
    // Respond with the updated reviews array.
    res.json(business.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
