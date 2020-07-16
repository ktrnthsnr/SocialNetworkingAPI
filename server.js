const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// imports routes from /routes/index.js, whereby index is the hub for other imported routes
app.use(require('./routes'));

// mongoose library connection to local mongo database (update public/assets/js/idb.js as well!)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetapi7', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost Port: ${PORT}`));
