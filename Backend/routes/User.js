const express = require('express');
const mongoose = require('mongoose');
const User = require('../Model/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const jwt_Secret = "HassaisGoodBy";
const fetchUser = require("../middleware/fetchUser");
const path = require("path");

// Set up nodemailer transporter with your email service provider (e.g., Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kkami5754049@gmail.com',
        pass: 'uqhzjlelvmyfzgmf',
    },
});

// Route for creating a user
router.post('/Create', async (req, res) => {
    const { name, email, Username, phone, Cpassword, password } = req.body;

    try {
        let user = await User.findOne({ email: req.body.email });
        // if (user) {
        //     return res.status(401).json({ error: "Sorry, a user with this email already exists" });
        // }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            isVerified: false, // Add a new field to the User model to track verification status
        });

        // Generate a random token for email verification
        const verificationToken = jwt.sign({ userId: user.id }, jwt_Secret, { expiresIn: '1d' });

        // Send email with verification link
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: req.body.email,
            subject: 'Account Verification',
            html: `Congratulation! Your account has been created successfully. Click on the following link to verify your account: <a href="http://localhost:3000/verify/${verificationToken}">Verify Account</a>`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Account created successfully. Check your email for verification." });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    }
});

// Route for handling email verification
router.get('/verify/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, jwt_Secret);

        // Find the user based on the decoded userId
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Mark the user as verified
        user.isVerified = true;
        await user.save();

        // Redirect to the login page or show a success message
        res.redirect('http://localhost:3000/Login');
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: "Invalid or expired token" });
    }
});

// Other routes and middleware can be added as needed



// Creating Route2 Logiin Route 
router.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const passwordCompare = bcrypt.compare(password, user.password);
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


router.get("/getUsers", fetchUser, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).send("User Not Found");
        }
        res.send(user)
    } catch (error) {
        console.error(error.message);
    }
})
router.put("/UpdateOneuser", fetchUser, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).send("User Not Found");
        }

        // Assuming you have request body with updated information
        const { name, email, password } = req.body;

        // Update user information
        user.name = name;
        user.email = email;
        user.password = password;

        // Save the updated user
        await user.save();

        res.status(200).send("User Updated Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.delete("/deleteAccount", fetchUser, async function (req, res) {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send("User Not Found");
        }
        const deletUser = await User.findByIdAndDelete(user);
        res.status(204).json({deletUser});
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;