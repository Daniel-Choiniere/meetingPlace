const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');

// @route        GET api/auth
// description   Test route
// @access       Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route        POST api/users
// description   Authenticate user and get token
// @access       Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required').exists()
],
 async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
    // see if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
        return res.status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // uses bcrypt to compare the user given password with the password token saved
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
        user : {
            id: user.id
        }
    }

    // get json web token
    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 420000 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
            }
        );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router; 