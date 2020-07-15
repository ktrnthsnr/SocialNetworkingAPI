const router = require('express').Router();
// import all of the API routes from /api/index.js (no need for index.js as it's implied)
const apiRoutes = require('./api');
const htmlRoutes = require('./html/html-routes');

// prefix of `/api` to all api routes imported from the `api` dir
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

// if no route avail, return a 404 error mess
router.use((req, res) => {
  res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;