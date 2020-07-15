// import methods from thought-controller file
const router = require('express').Router();

// import methods from the thoughts controller
const {
        addthought,
        removethought,
        addreaction,
        removereaction
      } = require('../../controllers/thought-controller');      

// ---------------- routes ----------------

//      POST /api/thoughts/<userId>
router
        .route('/:userId').post(addthought);

//      GET for thought by ID
//      PUT for reaction /api/thoughts/<userId>/<thoughtId>  
//      DELETE for thought
router
        .route('/:userId/:thoughtId')        // thought routes
        .put(addreaction)                        // reaction routes, which are within the thought controller
        .delete(removethought)                // delete thought

//      DELETE route for reaction /api/thoughts/<userId>/<thoughtId>/<reactionID>    
router
        .route('/:userId/:thoughtId/:reactionId').delete(removereaction);

//export 
module.exports = router;
