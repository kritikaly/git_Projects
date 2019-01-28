const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    
    OrderNo: {
        type: String,
        // required: true,
        // unique: true
    },
    CustomerId: {
        type:  String,
        // unique: true
    },
    PMethod: {
        type: String
    },
    GTotal: {
        type: Number
    },
    ItemName: {
        type: [String]
    },
    ItemId: {
        type: String
    },
    Price: {
        type: [String]
    },
    Quantity: {
        type: [String]
    },
    Total: {
        type: [Number]
    }
});

// OrderSchema.pre('save', function(next) {
//     this.CustomerId = (Math.floor(Math.random()*90000) + 10000).toString();
//     next();
// });

module.exports = mongoose.model('Order', OrderSchema, 'incomingOrders');
// third callback option is the collection i would like to use