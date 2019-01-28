const jwt = require('jsonwebtoken');

// this is the function that has to return true before the client is allowed access to the information stored on the
// mongoDB databse. Once the jwt token is acquired, it is sent to the /userProfile and taken through if statements.
// If the token is valid, it is verified and the mongoDB generated id (_id) is given to query through the database
// and return the user with the same generated id.
module.exports.verifyJwtToken = (req, res, next) => {
    let token;
    if ('authorization' in req.headers) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        console.log( req.headers['authorization']);
        return res.status(403).send({auth : false, message: 'No token has been provided, route denied!'});
    } else {
        console.log('a token is being verified!')
        jwt.verify(token, "SECRET#123",
        (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Token authentication failed.'});
            } else {
                req._id = decoded._id;
                next();
            }
        });
    }
}