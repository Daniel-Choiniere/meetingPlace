const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

// @route        POST api/posts
// description   Create a post
// @access       Private
router.get('/', (req, res) => res.send('Post route'));

module.exports = router; 