const router = require('express').Router();

const { 
  getAllThought, 
  createThought, 
  updateThought, 
  deleteThought, 
  addReaction, 
  deleteReaction, 
  getThoughtById 
} = require('../../controllers/thought-controller');

// const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

//api/thoughts GET all and POST
router.route('/')
.get(getAllThought)
.post(createThought);

// /api/thoughts/<thoughtId> GET one, PUT, and DELETE
router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions POST and DELETE reaction
router.route('/:thoughtId/reactions')
.post(addReaction);
// .delete(deleteReaction);

// /api/thoughts/<thoughtId>/<reactionId>
router.route('/:thoughtId/:reactionId')
.delete(deleteReaction);


module.exports = router;

// /api/thoughts

// /api/thoughts/:thoughtId/reactions