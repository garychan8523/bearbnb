const passport = require("passport");
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("users");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.put("/api/current_user/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        user.googleId = req.body.googleId;
        user.joindate = req.body.joindate;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.gender = req.body.gender || user.gender;
        user.birthmonth = req.body.birthmonth || user.birthmonth;
        user.birthday = req.body.birthday || user.birthday;
        user.birthyear = req.body.birthyear || user.birthyear;
        user.city = req.body.city || user.city;
        user.state = req.body.state || user.state;
        user.zipcode = req.body.zipcode || user.zipcode;
        user.country = req.body.country || user.country;
        user.languages = req.body.languages || user.languages;
        user.verified.id = true;
        user.verified.info = true;
        user.verified.email = true;
        user.verified.phone = true;
        user.verified.workemail = true;
        user.superuser = true;
        user.homeids = req.body.homeids || user.homeids;
        user.reviews = req.body.reviews || user.reviews;
        user.references = req.body.references || user.references;
        user.intro = req.body.intro || user.intro;
        user.image = req.body.image || user.image;
        user.admin = true;
        user.bookedHomes = req.body.bookedHomes || user.bookedHomes;

        user.save((err, user) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(user);
        });
      }
    });
  });
};
