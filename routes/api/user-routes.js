const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// /api/users GET all and POST
router.route('/')
.get(getAllUser)
.post(createUser);

// /api/users/:id GET one, PUT, and DELETE
router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId POST and DELETE friend
router.route('/:userId/friends/friendId')
.post(createFriend)
.delete(deleteFriend);


module.exports = router;



// /api/users

// /api/users/:userId/friends/:friendId

