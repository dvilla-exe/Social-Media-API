const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // Once the thought is created, push the thought's ID into the user's thoughts array
        return User.findByIdAndUpdate(
          req.body.userId, 
          { $push: { thoughts: thought._id } }, 
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by ID
  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by ID
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by ID
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        // Remove the thought ID from the user's thoughts array as well
        return User.findByIdAndUpdate(
          thought.userId, 
          { $pull: { thoughts: thought._id } }, 
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought deleted successfully' }))
      .catch((err) => res.status(500).json(err));
  },
};
