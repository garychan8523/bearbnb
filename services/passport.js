const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const formatDate = require("../helpers/formatDate");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const datetime = new Date();
      const joindate = formatDate(datetime);
      const user = await new User({
        googleId: profile.id,
        joindate: joindate,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        gender: profile.gender,
        birthmonth: "0",
        birthday: "0",
        birthyear: "0",
        city: "Anonymous",
        state: "",
        zipcode: "",
        country: "",
        school: "",
        work: "",
        languages: "",
        verified: {
          id: false,
          info: false,
          email: false,
          phone: false,
          workemail: false
        },
        superuser: false,
        homeids: [],
        reviews: [],
        references: [],
        bookedHomes: [],
        intro: "I'm new!",
        image: "bear1.jpg",
        admin: false
      }).save();
      done(null, user);
    }
  )
);
