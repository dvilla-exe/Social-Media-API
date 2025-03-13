const Thought = require('../models/Thought');

module.exports = {
  // Create a reaction for a thought
  createReaction(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        // Add the new reaction to the thought's reactions array
        thought.reactions.push(req.body);
        return thought.save();
      })
      .then((updatedThought) => res.json(updatedThought))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction by reactionId from a specific thought
  deleteReaction(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        // Pull the reaction out of the reactions array by its reactionId
        thought.reactions.id(req.params.reactionId).remove();
        return thought.save();
      })
      .then((updatedThought) => res.json(updatedThought))
      .catch((err) => res.status(500).json(err));
  },
};
