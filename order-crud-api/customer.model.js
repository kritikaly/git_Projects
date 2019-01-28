const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    
    Name: {
        type: String,
        required: true,
        unique: true
    },
    CustomerId: {
        type:  String,
        unique: true
    }
});

CustomerSchema.pre('save', function(next) {
    this.CustomerId = (Math.floor(Math.random()*90000) + 10000).toString();
    next();
});

module.exports = mongoose.model('Customer', CustomerSchema, 'customer');
// third callback option is the collection i would like to use