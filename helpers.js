const jwt = require('jsonwebtoken');

module.exports = function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

        jwt.verify(req.token, 'secretkey', (err, data) => {
            if(err) {
                res.send({message: err})
            } else {
                next();
            }
        })
    } else {
        res.sendStatus(403);
    }
}