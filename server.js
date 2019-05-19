const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB if success then mongoDB connect !!
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected !!'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config (引入各種strategy)
require('./config/passport')(passport)


// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder to client built
    app.use(express.static('client/build'));
    // any route in server get hit, it will load react index.html file (not api route)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))