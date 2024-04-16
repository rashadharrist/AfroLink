// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for a business entity using the mongoose Schema constructor
const BusinessSchema = new mongoose.Schema({
  // Reference to the User model for the business owner
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Uses MongoDB's unique identifier for referencing
    ref: 'User' // Indicates the model to which this ObjectId refers, enabling population of this field with User data
  },
  // Business name with validation rules
  name: {
    type: String, // Data type is String
    required: true, // This field must be provided for the document to be saved to the database
    trim: true // Automatically removes whitespace from the beginning and end of the string
  },
  // Description of the business
  description: {
    type: String, // Data type is String
    required: true // This field is required
  },
  // Category of the business (e.g., Restaurant, Retail, etc.)
  category: {
    type: String, // Data type is String
    required: true // This field is required
  },
  // Physical location of the business
  location: {
    type: String, // Data type is String
    required: true // This field is required
  },
  // Contact information structure within the same document
  contact: {
    email: String, // Contact email address
    phone: String // Contact phone number
  },
  // Array of review documents associated with this business
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model who authored the review
      ref: 'User' // Establishes a link to the User schema for data population
    },
    rating: {
      type: Number, // Numeric rating given in the review
      required: true // This field is required for a review to be valid
    },
    comment: String, // Text content of the review
    createdAt: {
      type: Date, // Timestamp for when the review was created
      default: Date.now // Automatically set to the current date and time upon creation
    }
  }],
  // Timestamp for when the business was created
  createdAt: {
    type: Date, // Data type is Date
    default: Date.now // Automatically set to the current date and time upon document creation
  }
});

// Export the model, enabling its use in other parts of the application
// 'Business' is the name of the model, which MongoDB will store in a 'businesses' collection
// BusinessSchema is the schema to use for this model
module.exports = mongoose.model('Business', BusinessSchema);
