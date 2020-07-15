const { user } = require('../models');

const userController = {
    // get all users - getAlluser method
        //callback function for the GET /api/users route
    getAlluser(req, res) {
      user.find({})
      .populate({           // added so with thoughtID, the thought(s) is populated as well.
        path: 'thoughts',   //    thoughts added
        select: '-__v'      //    exclude the __v in the thoughts
      })                    //    end popoulate.
        .select('-__v')     //    with excluded __v above.
        .sort({ _id: -1 })      // adding sort() method to sort DESC, to get latest user
        .then(dbuserData => res.json(dbuserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // get one user by id
        //  rather than accessing entire req, destructure just params from it
        // -- updated to get thoughts from single user
          getuserById({ params }, res) {
            user.findOne({ _id: params.id })
              .populate({
                path: 'thoughts',
                select: '-__v'
              })
              .select('-__v')
              .then(dbuserData => res.json(dbuserData))
              .catch(err => {
                console.log(err);
                res.sendStatus(400);
              });
          },

    // createuser
        // create method for handling POST /api/users to add a user to the database
                // destructure the body out of the Express.js req object 
    createuser({ body }, res) {
        user.create(body)
        .then(dbuserData => res.json(dbuserData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
        // request to PUT /api/users/:id   to find a single document
                // Note: without { new: true }, will return original doc. 
                 // By setting to true, Mongoose will return new version of doc
    updateuser({ params, body }, res) {
        user.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbuserData => {
            if (!dbuserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbuserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete user
        // request to DELETE /api/users/:id
    deleteuser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
        .then(dbuserData => {
            if (!dbuserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbuserData);
        })
        .catch(err => res.status(400).json(err));
    }

  }

module.exports = userController;