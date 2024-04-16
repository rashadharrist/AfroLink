const express = require('express');
const router = express.Router();

// Business routes
router.get('/', (req, res) => {
  res.send('Business list');
});

router.post('/', (req, res) => {
  res.send('Create a business');
});

module.exports = router;
