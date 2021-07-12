// import dependencies
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
      match: [/.+@.+\..+/, "Must match this pattern!"]
      // email: must match 
    },
    thoughts: [
      {
        type: Schema.types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// virtual that gets number of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;

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

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.