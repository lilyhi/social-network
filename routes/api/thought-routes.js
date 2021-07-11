const router = require('express').Router();
// const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').put(addReply).delete(removeThought);


// not sure about this one below, questioning the ones above
// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);




// /api/thoughts
// router.route('')

// /api/thoughts/:thoughtId/reactions


module.exports = router;