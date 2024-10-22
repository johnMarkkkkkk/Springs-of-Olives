const express = require('express');
const { getFeedbacks, createFeedback } = require('../controllers/feedbackController');
const router = express.Router();

router.route('/').get(getFeedbacks).post(createFeedback);

module.exports = router;
