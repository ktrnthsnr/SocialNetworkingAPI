//import models needed
const { thought, user } = require('../models');

// create object

const thoughtController = {
    // add thought to user, return a user Promise
    addthought({ params, body }, res) {
        console.log(body);
        thought.create(body)
          .then(({ _id }) => {
            return user.findOneAndUpdate(
              { _id: params.userId },
              // -- update the array with $push method, $ sign denotes MongoDB-based function
              { $push: { thoughts: _id } }, // -- push method will add thoughts' ID to the user
              { new: true }
            );
          })
          .then(dbuserData => {
            if (!dbuserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbuserData);
          })
          .catch(err => res.json(err));
      },

      // add reaction method resides within the thoughtController, 
        // note: new reactions are NOT adding, are Updating an existing thought
      addreaction({ params, body }, res) {
        thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true }
        )
          .then(dbuserData => {
            if (!dbuserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbuserData);
          })
          .catch(err => res.json(err));
      },
  
    // remove thought, remove thought & remove thought ID from its user 
    removethought({ params }, res) {
        thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedthought => {
            if (!deletedthought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return user.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbuserData => {
            if (!dbuserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbuserData);
          })
          .catch(err => res.json(err));
      },

    // remove reaction with $pull operator
    removereaction({ params }, res) {
      thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then(dbuserData => res.json(dbuserData))
        .catch(err => res.json(err));
    }
};

  
  
  module.exports = thoughtController;