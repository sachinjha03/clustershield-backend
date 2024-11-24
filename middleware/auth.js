const jwt = require('jsonwebtoken');
const secretKey = "MyNameIsSachinKumarJha";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ success: false, reason: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Add the decoded token data to the request
        next();
    } catch (err) {
        res.status(401).json({ success: false, reason: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
