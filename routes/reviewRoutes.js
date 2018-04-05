const passport = require("passport");
const mongoose = require("mongoose");
require("../models/Reviews");
const Review = mongoose.model("reviews");
const requireLogin = require("../middlewares/requireLogin");
const formatDate = require("../helpers/formatDate");

module.exports = app => {
  app.get("/reviews", (req, res) => {
    Review.find({}, (err, reviews) => {
      let reviewsList = {};

      reviews.forEach(review => {
        reviewsList[review._id] = review;
      });

      res.send(reviewsList);
    });
  });

  app.get("/reviews/:id", (req, res) => {
    Review.findById(req.params.id, (err, review) => {
      res.send({
        id: review.id,
        hostid: review.hostid,
        reviewdate: review.reviewdate,
        stars: review.stars,
        content: review.content,
        reviewerId: review.reviewerId,
        firstName: review.firstName,
        lastName: review.lastName,
        location: {
          city: review.location.city,
          state: review.location.state
        }
      });
    });
  });

  app.put("/reviews/:id", (req, res) => {
    Review.findById(req.params.id, (err, review) => {
      if (err) {
        res.status(500).send(err);
      } else {
        review.id = req.body.id;
        review.hostid = req.body.hostid;
        review.reviewdate = req.body.reviewdate;
        review.stars = req.body.stars || review.stars;
        review.content = req.body.content || review.content;
        review.reviewerId = req.body.reviewerId;
        review.firstName = req.body.firstName || review.firstName;
        review.lastName = req.body.lastName || review.lastName;
        review.location.city = req.body.location.city || review.location.city;
        review.location.state =
          req.body.location.state || review.location.state;

        review.save((err, review) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(review);
        });
      }
    });
  });

  app.post("/api/new_review", (req, res) => {
    const datetime = new Date();
    const reviewdate = formatDate(datetime);
    const review = new Review({
      hostid: req.body.hostid,
      reviewdate: reviewdate,
      stars: req.body.stars,
      content: req.body.content,
      reviewerId: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: {
        city: req.body.location.city,
        state: req.body.location.state
      }
    }).save();
  });
};
