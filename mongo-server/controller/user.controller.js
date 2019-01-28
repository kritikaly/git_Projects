const mongoose = require('mongoose');
const passport = require('passport');
const lo = require('lodash');

const User = mongoose.model('User');

module.exports.userPost = (req, res, next) => {
    console.log("request "+ req);
    const newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save((err, results) => {
        if(!err) {
            console.log(results);
            res.json({User: results});
        }
        else {
            if(err.code == 11000) {
                res.status(422).send('duplicate email address found.');
            }
            else {
                return next(err);
            }
        }
    });
};

module.exports.userGet = (req, res, next) => {
    User.find({}).exec((err, results) => {
        if(err) {
            res.send("you have an error", err);
            console.log(err); 
        }
        else {
            console.log(results);
            res.json({User: results});
        }
    });
};

// Utilizing local strategy (middleware) and passport, we are able to 
// If this returns true, we generate a jwt token (see user.model.js for the function).
// passports authenticate method with the first value as 'local' see config/passportConfig.js.
// this is just a query into the database using the post data from the client as a query.
// if there is no error the user is returned, if not, you get an error and a message (info) with it.
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            console.log('A token is being generated!');
            return res.status(200).json({ "token": user.generateJwt() });
        } else {
            return res.status(404).json(info);
        }
    })(req, res);
}

// this function sends the user from the database with the information that we choose using lodash (lo)
// we find the user using the mongoDB generated id (_id) as a query to search. If a user is found, we only return 
// the fullName value, and the email value. The password is not needed, and only used for authentication in this instance.
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user) {
                return res.status(404).json({ status: false, message: 'User record was not found.' });
            } else {
                return res.status(200).json({ status: true, user: lo.pick(user, ['fullName', 'email']) });
            }
        }    
    )
}