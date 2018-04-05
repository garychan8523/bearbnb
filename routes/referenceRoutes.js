const passport = require("passport");
const mongoose = require("mongoose");
require("../models/References");
const Reference = mongoose.model("references");
const requireLogin = require("../middlewares/requireLogin");
const formatDate = require("../helpers/formatDate");

module.exports = app => {
  app.get("/references", (req, res) => {
    Reference.find({}, (err, references) => {
      let referencesList = {};

      references.forEach(reference => {
        referencesList[reference._id] = reference;
      });

      res.send(referencesList);
    });
  });

  app.get("/references/:id", (req, res) => {
    Reference.findById(req.params.id, (err, reference) => {
      res.send({
        id: reference.id,
        hostid: reference.hostid,
        referencedate: reference.referencedate,
        stars: reference.stars,
        content: reference.content,
        referenceerId: reference.referenceerId,
        firstName: reference.firstName,
        lastName: reference.lastName,
        location: {
          city: reference.location.city,
          state: reference.location.state
        }
      });
    });
  });

  app.put("/references/:id", (req, res) => {
    Reference.findById(req.params.id, (err, reference) => {
      if (err) {
        res.status(500).send(err);
      } else {
        reference.id = req.body.id;
        reference.hostid = req.body.hostid;
        reference.referencedate = req.body.referencedate;
        reference.stars = req.body.stars || reference.stars;
        reference.content = req.body.content || reference.content;
        reference.referenceerId = req.body.referenceerId;
        reference.firstName = req.body.firstName || reference.firstName;
        reference.lastName = req.body.lastName || reference.lastName;
        reference.location.city =
          req.body.location.city || reference.location.city;
        reference.location.state =
          req.body.location.state || reference.location.state;

        reference.save((err, reference) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(reference);
        });
      }
    });
  });

  app.post("/api/new_reference", (req, res) => {
    const datetime = new Date();
    const referencedate = formatDate(datetime);
    const reference = new Reference({
      hostid: req.body.hostid,
      referencedate: referencedate,
      stars: req.body.stars,
      content: req.body.content,
      referenceerId: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: {
        city: req.body.location.city,
        state: req.body.location.state
      }
    }).save();
  });
};
