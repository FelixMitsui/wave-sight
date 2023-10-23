
const authentication = (req, res, next) => {
    const sid = req.cookies['user'] && req.cookies['user'].split('.')
    if (!sid) {
        req.session.destroy()
        return res.status(401).send('Please login again.');
    }

    const sessionID = sid[0].slice(2);

    if (sessionID === req.sessionID) {
        req.decoded = req.session.user
        return next();
    } else {
        return res.status(401).send('Unauthorized!');
    }
};

module.exports = authentication;
