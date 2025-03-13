const router = require('express').Router();
const { createThought, getAllThoughts, getThoughtById, updateThought, deleteThought } = require('../controllers/thoughtController');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
