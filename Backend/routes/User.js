const express = require('express');
const mongoose = require('mongoose');
const User = require('../Model/User')
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const jwt_Secret = "HassaisGoodBy";
const fetchUser = require("../middleware/fetchUser")
const path = require("path");
// Rout1 Creating A user with Validation
router.post('/Create', async (req, res) => {
    const { name, email, Username, phone, Cpassword, password } = req.body
    console.log(req.body)
    try {
       
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(401).json({ error: "Sorry, a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id,
            },
        };

        const AuthToken = jwt.sign(data, jwt_Secret);
        res.json({ AuthToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    }
});


// Creating Route2 Logiin Route 

router.post("/Login",  async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const passwordCompare =  bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Password does not found that you enter" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const AuthToken = jwt.sign(data, jwt_Secret);
        const success = true;

        res.json({ success, AuthToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route 3 Fetching Error
router.get("/UserDetail", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching user data");
    }
});
module.exports = router;