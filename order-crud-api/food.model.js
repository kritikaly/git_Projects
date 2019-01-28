const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    
    Food: {
        type: String,
        required: "cannot add to the menu providing a name for the food!!",
        unique: true
    },
    Price: {
        type: String,
        required: "what is the price of this menu item?",
    }
});

module.exports = mongoose.model('Food', FoodSchema, 'food');
// third callback option is the collection i would like to use