const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User')
const { isStrongPassword } = require('validator');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const jwt_Secret = "HassaisGoodBy";
const fetchUser = require("../middleware/fetchUser")
const { check, validationResult } = require('express-validator');
const multer = require("multer")
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Uploads");

    },
    filename: function (req, file, cb) {
        req.filename = `${Date.now()}-${file.originalname}`;
        cb(null, req.filename);
    }
});
const upload = multer({ storage: storage });
// Rout1 Creating A user with Validation

router.post('/Create', 
// [
//     check('email', 'Please Enter Your Email').isEmail(),
//     check('Username')
//         .notEmpty().withMessage('Please Enter Your Username')
//         .custom(value => {
//             if (/\s/.test(value)) {
//                 throw new Error('Space is not accepted in the username');
//             }
//             return true;
//         }),
//     check('name', 'Name length should be 10 to 20 characters').isLength({ min: 5, }),
//     check('password')
//         .isLength({ min: 8, max: 20 }).withMessage('Password length should be between 8 and 20 characters')
//         .custom(value => {
//             if (!isStrongPassword(value, {
//                 minLength: 8,
//                 minLowercase: 0,
//                 minUppercase: 1,
//                 minNumbers: 1,
//                 minSymbols: 1,
//                 returnScore: false,
//             })) {
//                 throw new Error('Password must contain at least 1 uppercase letter, 1 number, and 1 special character');
//             }
//             return true;
//         }),
//     check('Cpassword')
//         .isLength({ min: 8, max: 20 }).withMessage('Password length should be between 8 and 20 characters')
//         .custom((value, { req }) => {
//             if (value !== req.body.password) {
//                 throw new Error('Passwords do not match');
//             }
//             return true;
//         }),
//     check('phone')
//         .isNumeric().withMessage('Phone must be a number')
//         .isLength({ min: 8, max: 20 }).withMessage('Phone length should be between 8 and 20 numbers'),
// ],       
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
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
            Username: req.body.Username,
            phone: req.body.phone,
            Cpassword: secPass,
            password: secPass,
            image:req.body.image
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

router.post("/Login", [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter your password').exists(),
], async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
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