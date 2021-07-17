const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema (
  {
    // set custom id to avoid confusion with parent thought_id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  }
);


const ThoughtSchema = new Schema ( 
  {
    thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: { 
      type: String,
      required: true
    }, 
    reactions: [ReactionSchema]
  },
  {
    toJson: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total reactions count
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;


// * thoughtText 
// String
// Required
// Must be between 1 and 280 characters

// * createdAt
// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

// * username (The user that created this thought)
// String
// Required

// * reactions (These are like replies)
// Array of nested documents created with the reactionSchema

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.


// Reaction Schema Only

// * reactionId
// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId

// * reactionBody
// String
// Required
// 280 character maximum

// * username
// String
// Required

// * createdAt
// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

