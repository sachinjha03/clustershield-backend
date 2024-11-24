const express = require('express');
const User = require("../models/User");
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = "MyNameIsSachinKumarJha";

router.post("/login-user", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const storedPassword = user.password;
            const enteredPassword = req.body.password;
            const matchPassword = await bcryptjs.compare(enteredPassword, storedPassword);
            if (matchPassword) {
                // Create token
                const token = jwt.sign({ id: user._id, email: user.email }, secretKey);

                res.status(200).json({ success: true, data: user, token });
            } else {
                res.status(400).json({ success: false, reason: "Incorrect Password!!" });
            }
        } else {
            res.status(404).json({ success: false, reason: "User Not Found!!" });
        }
    } catch (err) {
        res.status(500).json({ success: false, reason: err });
    }
});

module.exports = router;
