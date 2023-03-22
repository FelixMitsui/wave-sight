var jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./config.env" })
const authentication = (req, res, next) => {
    let token;
    try {
        token = req.headers['authorization'].split(' ')[1];

    } catch (e) {
        token = '';
    }
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {

            return res.status(401).json({ message: 'Unauthorized!' });
        } else {
            req.decoded = decoded
            console.log(`decoded:${decoded}`)
            return next();

            // console.log(decoded)


        }
    })
};

module.exports = authentication;