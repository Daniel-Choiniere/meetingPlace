const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// package that will do validation checks on submitted data
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');

// @route        POST api/users
// description   Register User
// @access       Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter a password with six or more characters').isLength({ min: 6 })
],
 async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
    // see if the user already exists
    let user = await User.findOne({ email });

    if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Get the users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg', 
        d: 'nm'
    })

    user = new User({
        name,
        email,
        avatar,
        password
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);

    user .password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    res.send('User registered');

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    
});

module.exports = router; 