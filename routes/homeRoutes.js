const passport = require("passport");
const mongoose = require("mongoose");
require("../models/Homes");
const Home = mongoose.model("homes");
const formatDate = require("../helpers/formatDate");

module.exports = app => {
  app.get("/api/homes", (req, res) => {
    Home.find({}, (err, homes) => {
      let homesList = {};

      homes.forEach(home => {
        homesList[home._id] = home;
      });

      res.send(homesList);
    });
  });

  app.get("/api/homes/:id", (req, res) => {
    Home.findById(req.params.id, (err, home) => {
      res.send({
        id: home.id,
        hostid: home.hostid,
        homelocation: {
          address: home.homelocation.address,
          city: home.homelocation.city,
          state: home.homelocation.state,
          zipcode: home.homelocation.zipcode,
          lat: home.homelocation.lat,
          lng: home.homelocation.lng
        },
        homeinformation: {
          title: home.homeinformation.title,
          price: home.homeinformation.price,
          guestlimit: home.homeinformation.guestlimit,
          description: home.homeinformation.description,
          othernotes: home.homeinformation.othernotes
        },
        startTime: home.startTime,
        endTime: home.endTime,
        images: home.images,
        reviewAvg: {
          avg: home.reviewAvg.avg
        },
        reviews: home.reviews,
        booking: home.booking
      });
    });
  });

  app.put("/api/homes/:id", (req, res) => {
    Home.findById(req.params.id, (err, home) => {
      if (err) {
        res.status(500).send(err);
      } else {
        home.hostid = req.user.id;
        home.homelocation.address =
          req.body.homelocation.address || home.homelocation.address;
        home.homelocation.city =
          req.body.homelocation.city || home.homelocation.city;
        home.homelocation.state =
          req.body.homelocation.state || home.homelocation.state;
        home.homelocation.zipcode =
          req.body.homelocation.zipcode || home.homelocation.zipcode;
        home.homelocation.lat =
          req.body.homelocation.lat || home.homelocation.lat;
        home.homelocation.lng =
          req.body.homelocation.lng || home.homelocation.lng;

        home.homeinformation.title =
          req.body.homeinformation.title || home.homeinformation.title;
        home.homeinformation.price =
          req.body.homeinformation.price ||
          home.homeinformation.price;
        home.homeinformation.guestlimit =
          req.body.homeinformation.guestlimit |ƒ|
          home.homeinformation.guestlimit;
        home.homeinformation.description =
          req.body.homeinformation.description ||
          home.homeinformation.description;
        home.homeinformation.othernotes =
          req.body.homeinformation.othernotes ||
          home.homeinformation.othernotes;

        home.startTime = req.body.startTime || home.startTime;
        home.endTime = req.body.endTime || home.endTime;

        home.images = req.body.images || home.images;

        home.reviewAvg.avg = req.body.reviewAvg.avg || home.reviewAvg.avg;

        home.reviews = req.body.reviews || home.reviews;
        home.booking = req.body.booking || home.booking;

        home.save((err, home) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(home);
        });
      }
    });
  });

  app.post("/api/new_home", (req, res) => {
    const datetime = new Date();
    const homedate = formatDate(datetime);

    const home = new Home({
      hostid: req.body.hostid,
      homelocation: {
        address: req.body.homelocation.address,
        city: req.body.homelocation.city,
        state: req.body.homelocation.state,
        zipcode: req.body.homelocation.zipcode,
        lat: req.body.homelocation.lat,
        lng: req.body.homelocation.lng
      },
      homeinformation: {
        title: req.body.homeinformation.title,
        price: req.body.homeinformation.price,
        guestlimit: req.body.homeinformation.guestlimit,
        description: req.body.homeinformation.description,
        othernotes: req.body.homeinformation.othernotes,
      },
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      images: [req.body.images],
      reviewAvg: {
        avg: req.body.reviewAvg.avg
      },
      reviews: [req.body.reviews],
      booking: [req.body.booking]
    }).save();
  });
};
