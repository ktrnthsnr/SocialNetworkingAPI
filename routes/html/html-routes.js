const router = require('express').Router();

// declare path
const path = require('path');

// route user list to /
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/user-list.html'));
});

// route user list to /add-user
router.get('/add-user', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-user.html'));
});

router.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/user.html'));
});

// export routes
module.exports = router;
