const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema ( 
  {
    thoughText: {
    type: String,
    required: true,
    // must be between 1 and 280 chars
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
      // dateFormat is a function that needs to be made
    },
    username: {
      type: String,
      required: true
    }, 
    reactions: {
      
    }
  }
)



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
