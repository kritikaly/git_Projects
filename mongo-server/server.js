// this uses the "userDB" & "docs" mongo server!!!
require('./models/db.js');
require('./config/passportConfig')


const express = require('express');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const routesInWork = require('./index.router');

const app = express();

// middleware
app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize())

// refer to the file './index.router.js' in root directory of the mongo-server
app.use('/', routesInWork);

app.use(upload());

// A validation error handling function. considering valErrors is an array, we print out the errors in the object err
// as an array and pushed it into the valError array. We send a specific code 422 to let the client-side know that
// there was a validation error
app.use((err, req, res, next) => {
    if(err.name == 'ValidationError') {
        let valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

const port = 1334;

const server = app.listen(port, '127.0.0.1', () => {
    console.log(`server is live on port ${port}`);
});
