// import dependencies
const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema (
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // email: must match (might be in the class video)
    },
    thoughts: {

    }
  }
)

// * username
// String
// Unique
// Required
// Trimmed

// * email
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)

// * thoughts 
// Array of _id values referencing the Thought model

// * friends 
// Array of _id values referencing the User model (self-reference)

