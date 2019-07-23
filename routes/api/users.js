const express = require('express');
const router = express.Router();

// @route        POST api/users
// description   Register User
// @access       Public
router.get('/', (req, res) => {
    console.log(re.body);
    res.send('User route')
});

module.exports = router; 