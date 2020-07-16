//thought model

// add  Types object to import ObjectID() value from the _id field
const { Schema, model, Types } = require('mongoose');
// import Moment.js to format the date
const moment = require('moment');

// adding reactions to thought.js, + adding ObjectID() 
const reactionSchema = new Schema(
      {
       // add a new customized id, different from its parent thought _id
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280
        },
        friend: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
          // added getters so date is formatted with Moment method
          get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
      },
      {
        toJSON: {
          // virtuals: true,   
          getters: true     // moment.js date formatting set to true
        }
      }
    );



const thoughtSchema = new Schema(
      {
        friend: {
          type: String,
          unique: true,
          required: true,
          trim: true
        },
        thoughtText: {
          type: String,
          required: true,
          minlength:1,
          maxlength: 280
        },
        createdAt: {
          type: Date,
          default: Date.now,
           // add getters to format the date through a Moment method
          get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        // associate reactions to thought to have fields populated by an array, validate data for a reaction
        reactions: [reactionSchema]
      },
      {
        toJSON: {
          virtuals: true, // (2) virtual set to true
          getters: true
        },
        id: false
      }
    );

// (1) virtual definition to add reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

module.exports = thought;

