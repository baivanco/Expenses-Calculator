const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User Model
const User = require("../../models/User");

//@route  POST api/auth
//@desc   Auth New User
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please Enter All Fields" });
  }

  //Check Existing User
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does Not Exists" });

    //Validate Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });
      jwt.sign(
        {
          id: user._id
        },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              register_date: user.register_date,
              telephone: user.telephone,
              country: user.country
            }
          });
        }
      );
    });
  });
});

//@route GET api/auth/user

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
