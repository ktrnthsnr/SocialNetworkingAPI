const router = require('express').Router();

// index.js file will import all of the API routes, prefix their endpoint names and package them together

const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);  // add prefix of `/thought` to routes created in `thought-routes.js`
router.use('/users', userRoutes);      // add prefix of `/users` to routes created in `user-routes.js`

   
module.exports = router;