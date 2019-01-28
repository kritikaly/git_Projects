const passport = require('passport');
const localStrategy = require('passport-local');
const mongoose = require('mongoose');

let User = mongoose.model('User');

// A query into the mongoDB database. if statements to run through the apparent errors, then if none
// of them happen and the user sent (via post method) the user that was matched is returned.
passport.use(
    new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
        User.findOne({ email: username },
            (err, user) => {
                if (err) {
                    return done(err);
                } else if (!user) {
                    return done(null, false, { message: 'Email is not registered...' });
                } else if (!user.verifyPassword(password)) {
                    return done(null, false, { message: 'wrong password' });
                } else {
                    return done(null, user);
                }
            })
    })
);