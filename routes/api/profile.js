const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profiles");
const User = require("../../models/Users");  

// @route        GET api/profile/me
// description   Get current users profile
// @access       Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await profile
      .findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route        POST api/profile
// description   Create or update users profile
// @access       Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedIn
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    // if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route        GET api/profile
// description   Get all profiles
// @access       Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route        GET api/profile/user/:user_id
// description   Get profile by user ID
// @access       Public
router.get("/user/:user_id", async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
    
      if (!profile) return res.status(400).json({ msg: "Profile not found" });  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found' });
      }
      res.status(500).send("Server Error");
    }
  });

// @route        DELETE api/profile
// description   Delete profile, user & posts
// @access       Private
router.delete("/", auth, async (req, res) => {
    try {
      // Remove profile
      await Profile.findOneAndDelete({ user: req.user.id });
      // Remove user 
      await User.findOneAndDelete({ _id: req.user.id });
  
      res.json({ msg: 'User deleted' });
    } catch (err) { 
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route        PUT api/profile/experience
// description   Add profile experience
// @access       Private
router.put('/experience', [ auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
 ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // pulls this data out of req.body and defines it to variables we can work with
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description 
        } = req.body;

        // create a new object
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description 
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            // pushes the newExp object we created into the begining of the profile array
            profile.experience.unshift(newExp);
          
            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

// @route        DELETE api/profile/experience/:exp_id
// description   Delete profile experience
// @access       Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const expIds = foundProfile.experience.map(exp => exp._id.toString());
    // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /experience/5
    const removeIndex = expIds.indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
  
      foundProfile.experience.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route        PUT api/profile/education
// description   Add education to profile
// @access       Private
router.put('/education', 
[ 
  auth, 
  [
  check('school', 'School is required')
      .not()
      .isEmpty(),
  check('degree', 'Degree is required')
      .not()
      .isEmpty(),
  check('fieldofstudy', 'Field of study is required')
      .not()
      .isEmpty(),
  check('from', 'From date is required')
      .not()
      .isEmpty()
  ]
], 
  async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      // pulls this data out of req.body and defines it to variables we can work with
      const {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description 
      } = req.body;

      // create a new object
      const newEdu = {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description 
      };

      try {
          const profile = await Profile.findOne({ user: req.user.id });

          // pushes the newEdu object we created into the begining of the profile array
          profile.education.unshift(newEdu);
        
          await profile.save();

          res.json(profile);
      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
});

// @route        DELETE api/profile/education/:edu_id
// description   Delete education from profile 
// @access       Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const eduIds = foundProfile.education.map(exp => edu._id.toString());
    // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /experience/5
    const removeIndex = eduIds.indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
  
      foundProfile.education.splice(removeIndex, 1);
      await profile.save();
      return res.status(200).json(profile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
