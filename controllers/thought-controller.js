const { Thought, User, Reaction } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ createdAt: -1 }) 
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    console.log("Get a thought by ID ")
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id! '})
          return;
        }
        res.json(dbThoughtData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  // create thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        // update the user table
        return User.findOneAndUpdate(
          { _id: body.userId }, 
          {$push: {thoughts: _id }}, 
          {new: true}
        );
        // res.json(dbThoughtData)
      }).then(dbUserData => {
        // if no thought is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id! '})
          return;
        }
        res.json({ message: 'User thought created succesfully' });
      })
      .catch(err => res.status(400).json(err));
  },


  // POST to create a reaction stored in a single thought's reactions array field
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // update a thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id! '});
          return;
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(400).json(err));
  },

  // delete thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' })
          return;
        }
        res.json(dbThoughtData)
        return User.findOneAndUpdate({ _id: body.userId }, {$pull: {thoughts: dbThoughtData._id }}, {new: true})
        // res.json(dbThoughtData)
        // line 109 and 111 had dbUserData instead, i just changed it to test
      }).then(dbUserData => {
        // if no thought is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id! '})
          return;
        }
        res.json({ message: 'User thought created succesfully' });
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
};



module.exports = thoughtController;









// /api/thoughts

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// PUT to update a thought by its _id

// DELETE to remove a thought by its _id


// THEN ------------->

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value