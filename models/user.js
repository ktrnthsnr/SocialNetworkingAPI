// user model

const { Schema, model } = require('mongoose');
const moment = require('moment');   // will format createdAd date to look better
const thought = require('./thought');

//schema
const userSchema = new Schema(
  {
    // note: MongoDB ObjectID or _id will be autogenerated, no need to add to model
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    // with Moment.js installed, use Getter with Mongoose, by adding a get key to the field
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    profession: {
      type: String,
      default: 'Select one'
    },
    category: [],    //array of category
    // parent (user model) associates to child documents (thought model)    
    thoughts: [   
      {
        type: Schema.Types.ObjectId,  //associate user and thoughts models through ObjectID
        ref: 'thought'
      }
    ],
    newfriends: [
      {
        type: Schema.Types.ObjectId,  //associate User and friend (in same model) through ObjectID
        ref: 'user'
      }
    ]
  },

    // Virtual added, which is separated from grouping
      // this Virtual is for counts of thoughts
      {
        toJSON: {
          virtuals: true,  // (2) virtual set to true
          getters: true   // work with moment.js, date formatter Getter as per above
        },
        id: false
      }   
  );

// --  To add virtuals, (1) this definition (2) update schema above with toJSON property
      //get total count of thoughts and reactions on retrieval, updated to gain tally of every thought with reactions
  userSchema.virtual('thoughtCount').get(function() {
        return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
  });
  userSchema.virtual('newfriendsCount').get(function() {
    return this.newfriends.reduce((total, thought) => total + friend.reactions.length + 1, 0);
});
   

  // create the user model using the userSchema
const user = model('user', userSchema);

  // export the user model
module.exports = user;