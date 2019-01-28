const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File_pathSchema = new Schema({
    path: {
        type: String,
        // require: true
    },
    name: {
        type: String,
        //required: true
    }
});

module.exports = mongoose.model('File_path', File_pathSchema);