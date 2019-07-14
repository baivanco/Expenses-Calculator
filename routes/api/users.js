const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../../models/User");

//@route  POST api/users
//@desc   Register New User
router.post("/", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    register_date,
    telephone,
    country,
    password
  } = req.body;

  //Simple Validation
  if (
    !first_name ||
    !last_name ||
    !email ||
    !register_date ||
    !telephone ||
    !country ||
    !password
  ) {
    return res.status(400).json({ msg: "Please Enter All Fields" });
  }

  //Check Existing User
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    } else {
      const newUser = new User({
        first_name,
        last_name,
        email,
        register_date,
        telephone,
        country,
        password
      });

      //Create Salt & Hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
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
    }
  });
});

module.exports = router;
