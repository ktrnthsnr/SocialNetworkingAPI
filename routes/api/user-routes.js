const router = require('express').Router();

// connecting to the routes, implementing controller methods
const {
  getAlluser,
  getuserById,
  createuser,
  updateuser,
  deleteuser
} = require('../../controllers/user-controller');

const { update } = require('../../models/user');

// Set up GET all and POST at /api/users

    // /api/users
    router
      .route('/')
      .get(getAlluser)
      .post(createuser);

    // Set up GET one, PUT, and DELETE at /api/users/:id
    // /api/users/:id
    router
      .route('/:id')
      .get(getuserById)
      .put(updateuser)
      .delete(deleteuser);

module.exports = router;