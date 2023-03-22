const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    return jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: "5000s",
    });
}

module.exports = {
    generateAccessToken,
};