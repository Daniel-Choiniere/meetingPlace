const express = require('express');
const router = express.Router();
// package that will do validation checks on submitted data
const { check, validationResult } = require('express-validator');

// @route        POST api/users
// description   Register User
// @access       Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter a password with six or more characters').isLength({ min: 6 })
], (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // see if the user already exists

    // Get the users gravatar

    // Encrypt the password

    // Return sonwebtoken

    res.send('User route');
});

module.exports = router; 