const passport = require("passport");
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/profile/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
      res.send({
        id: user.id,
        joindate: user.joindate,
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        state: user.state,
        country: user.country,
        languages: user.languages,
        school: user.school,
        work: user.work,
        verified: user.verified,
        superuser: user.superuser,
        homeids: user.homeids,
        reviews: user.reviews,
        references: user.references,
        intro: user.intro,
        image: user.image
      });
    });
  });

  app.get("/api/users", (req, res) => {
    User.find({}, (err, user) => {
      let userList = {};

      user.forEach(user => {
        userList[user._id] = {
          firstName: user.firstName,
          image: user.image,
          location: {
            city: user.city,
            state: user.state
          }
        };
      });
      res.send(userList);
    });
  });
};
