const mongoose = require('mongoose');

const url1 = 'mongodb://localhost/userDB';
const url2 = 'mongodb://localhost/docs';
 
mongoose.connect(url1, (err) => {
    if(!err) {
        console.log('Server is connected to mongo'); 
    }
    else {
        console.log('connection error: ' + JSON.stringify(err, undefined, 2))
    }
});
require('./User.model.js');
require('./File_path.model.js');