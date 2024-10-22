const Feedback = require('../models/feedback');

// Get all feedback
exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
    const { customerName, email, feedback } = req.body;
    try {
        const newFeedback = new Feedback({ customerName, email, feedback });
        await newFeedback.save();
        res.json(newFeedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
