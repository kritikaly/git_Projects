const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "Full name cannot be empty"
    },
    email: {
        type: String,
        required: "email cannot be empty",
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [4, "Password must be atleast 4 characters long"]
    },
    saltSecret: String
    // use some cookies on the server side
});

// Custom validation for email
UserSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Bcrypt enctyption going on here
UserSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// methods
// comparison between an entered password and the hashed password!
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
// arrow functions = buggy
// a function generating a jwt token and giving the mongodb generated id (_id)
UserSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        "SECRET#123", 
        {
            expiresIn: "2m"
        });
}

module.exports = mongoose.model('User', UserSchema);