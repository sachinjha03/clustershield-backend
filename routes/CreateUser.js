const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = "MyNameIsSachinKumarJha";

router.post("/create-user", async (req, res) => {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const myUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        const response = await myUser.save();

        // Create token
        const token = jwt.sign({ id: response._id, email: response.email }, secretKey);

        res.status(200).json({ success: true, data: response, token });
    } catch (err) {
        res.status(500).json({ success: false, reason: err });
    }
});


module.exports = router;

