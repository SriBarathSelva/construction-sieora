const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, "SecretKey123");
            req.user = user;  // Assign user data to req.user
            next();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
    if (!token) {
        res.status(401).json({ msg: "Not Authorized" });
    }
};
