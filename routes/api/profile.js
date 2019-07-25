const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route        GET api/profile/me
// description   Get current users profile      
// @access       Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await profile.findOne({ user: req.user.id}).populate(
            'user',
            ['name', 'avatar']
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router; 