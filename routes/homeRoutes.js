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
          boundary: home.homeinformation.boundary,
          price: {
            weekday: home.homeinformation.price.weekday,
            weekend: home.homeinformation.price.weekend,
            extra: home.homeinformation.price.extra,
            extraminguest: home.homeinformation.price.extraminguest,
            cleaning: home.homeinformation.price.cleaning
          },
          guestlimit: home.homeinformation.guestlimit,
          bedrooms: home.homeinformation.bedrooms,
          sleeping: {
            bedroom1: {
              twin: home.homeinformation.sleeping.bedroom1.twin,
              queen: home.homeinformation.sleeping.bedroom1.queen,
              king: home.homeinformation.sleeping.bedroom1.king,
              couch: home.homeinformation.sleeping.bedroom1.couch,
              airmattress: home.homeinformation.sleeping.bedroom1.airmattress
            },
            bedroom2: {
              twin: home.homeinformation.sleeping.bedroom2.twin,
              queen: home.homeinformation.sleeping.bedroom2.queen,
              king: home.homeinformation.sleeping.bedroom2.king,
              couch: home.homeinformation.sleeping.bedroom2.couch,
              airmattress: home.homeinformation.sleeping.bedroom2.airmattress
            },
            bedroom3: {
              twin: home.homeinformation.sleeping.bedroom3.twin,
              queen: home.homeinformation.sleeping.bedroom3.queen,
              king: home.homeinformation.sleeping.bedroom3.king,
              couch: home.homeinformation.sleeping.bedroom3.couch,
              airmattress: home.homeinformation.sleeping.bedroom3.airmattress
            },
            bedroom4: {
              twin: home.homeinformation.sleeping.bedroom4.twin,
              queen: home.homeinformation.sleeping.bedroom4.queen,
              king: home.homeinformation.sleeping.bedroom4.king,
              couch: home.homeinformation.sleeping.bedroom4.couch,
              airmattress: home.homeinformation.sleeping.bedroom4.airmattress
            },
            bedroom5: {
              twin: home.homeinformation.sleeping.bedroom5.twin,
              queen: home.homeinformation.sleeping.bedroom5.queen,
              king: home.homeinformation.sleeping.bedroom5.king,
              couch: home.homeinformation.sleeping.bedroom5.couch,
              airmattress: home.homeinformation.sleeping.bedroom5.airmattress
            },
            common: {
              twin: home.homeinformation.sleeping.common.twin,
              queen: home.homeinformation.sleeping.common.queen,
              king: home.homeinformation.sleeping.common.king,
              couch: home.homeinformation.sleeping.common.couch,
              airmattress: home.homeinformation.sleeping.common.airmattress
            }
          },
          bathrooms: home.homeinformation.bathrooms,
          rules: {
            smoking: home.homeinformation.rules.smoking,
            pets: home.homeinformation.rules.pets,
            parties: home.homeinformation.rules.parties,
            checkin: home.homeinformation.rules.checkin,
            checkout: home.homeinformation.rules.checkout,
            selfcheckin: home.homeinformation.rules.selfcheckin,
            comments: home.homeinformation.rules.comments
          },
          minimumstay: home.homeinformation.minimumstay,
          cancellation: home.homeinformation.cancellation,
          description: home.homeinformation.description,
          homespace: home.homeinformation.homespace,
          guestaccess: home.homeinformation.guestaccess,
          interaction: home.homeinformation.interaction,
          amenities: {
            pets: home.homeinformation.amenities.pets,
            elevator: home.homeinformation.amenities.elevator,
            doorman: home.homeinformation.amenities.doorman,
            kids: home.homeinformation.amenities.kids,
            smoking: home.homeinformation.amenities.smoking,
            kitchen: home.homeinformation.amenities.kitchen,
            intercom: home.homeinformation.amenities.intercom,
            internet: home.homeinformation.amenities.internet,
            events: home.homeinformation.amenities.events,
            parking: home.homeinformation.amenities.parking,
            hottub: home.homeinformation.amenities.hottub,
            wheelchair: home.homeinformation.amenities.wheelchair,
            cable: home.homeinformation.amenities.cable,
            gym: home.homeinformation.amenities.gym,
            breakfast: home.homeinformation.amenities.breakfast,
            fireplace: home.homeinformation.amenities.fireplace,
            dryer: home.homeinformation.amenities.dryer,
            laptop: home.homeinformation.amenities.laptop,
            pool: home.homeinformation.amenities.pool,
            washer: home.homeinformation.amenities.washer,
            tv: home.homeinformation.amenities.tv,
            iron: home.homeinformation.amenities.iron,
            hangers: home.homeinformation.amenities.hangers,
            essentials: home.homeinformation.amenities.essentials,
            hairdryer: home.homeinformation.amenities.hairdryer,
            ac: home.homeinformation.amenities.ac,
            shampoo: home.homeinformation.amenities.shampoo,
            heating: home.homeinformation.amenities.heating,
            streetparking: home.homeinformation.amenities.streetparking,
            privent: home.homeinformation.amenities.privent,
            ethernet: home.homeinformation.amenities.ethernet,
            paidparking: home.homeinformation.amenities.paidparking
          },
          familyamenities: {
            babybath: home.homeinformation.familyamenities.babybath,
            babymonitor: home.homeinformation.familyamenities.babymonitor,
            babysitter: home.homeinformation.familyamenities.babysitter,
            changingtable: home.homeinformation.familyamenities.changingtable,
            toys: home.homeinformation.familyamenities.toys,
            dinnerware: home.homeinformation.familyamenities.dinnerware,
            crib: home.homeinformation.familyamenities.crib,
            fireplaceguards:
              home.homeinformation.familyamenities.fireplaceguards,
            gameconsole: home.homeinformation.familyamenities.gameconsole,
            highchair: home.homeinformation.familyamenities.highchair,
            outletcovers: home.homeinformation.familyamenities.outletcovers,
            packnplay: home.homeinformation.familyamenities.packnplay,
            shades: home.homeinformation.familyamenities.shades,
            stairgate: home.homeinformation.familyamenities.stairgate,
            tablecorners: home.homeinformation.familyamenities.tablecorners,
            windowguards: home.homeinformation.familyamenities.windowguards
          },
          safetyfeatures: {
            smoke: home.homeinformation.safetyfeatures.smoke,
            firstaid: home.homeinformation.safetyfeatures.firstaid,
            fire: home.homeinformation.safetyfeatures.fire
          }
        },
        images: home.images,
        reviewAvg: {
          avg: home.reviewAvg.avg,
          accuracy: home.reviewAvg.accuracy,
          communication: home.reviewAvg.communication,
          cleanliness: home.reviewAvg.cleanliness,
          location: home.reviewAvg.location,
          checkin: home.reviewAvg.checkin,
          value: home.reviewAvg.value
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
        home.homeinformation.boundary =
          req.body.homeinformation.boundary || home.homeinformation.boundary;

        home.homeinformation.price.weekday =
          req.body.homeinformation.price.weekday ||
          home.homeinformation.price.weekday;
        home.homeinformation.price.weekend =
          req.body.homeinformation.price.weekend ||
          home.homeinformation.price.weekend;
        home.homeinformation.price.extra =
          req.body.homeinformation.price.extra ||
          home.homeinformation.price.extra;
        home.homeinformation.price.extraminguest =
          req.body.homeinformation.price.extraminguest ||
          home.homeinformation.price.extraminguest;
        home.homeinformation.price.cleaning =
          req.body.homeinformation.price.cleaning ||
          home.homeinformation.price.cleaning;

        home.homeinformation.guestlimit =
          req.body.homeinformation.guestlimit ||
          home.homeinformation.guestlimit;
        home.homeinformation.bedrooms =
          req.body.homeinformation.bedrooms || home.homeinformation.bedrooms;

        home.homeinformation.sleeping.bedroom1.twin =
          req.body.homeinformation.sleeping.bedroom1.twin ||
          home.homeinformation.sleeping.bedroom1.twin;
        home.homeinformation.sleeping.bedroom1.queen =
          req.body.homeinformation.sleeping.bedroom1.queen ||
          home.homeinformation.sleeping.bedroom1.queen;
        home.homeinformation.sleeping.bedroom1.king =
          req.body.homeinformation.sleeping.bedroom1.king ||
          home.homeinformation.sleeping.bedroom1.king;
        home.homeinformation.sleeping.bedroom1.couch =
          req.body.homeinformation.sleeping.bedroom1.couch ||
          home.homeinformation.sleeping.bedroom1.couch;
        home.homeinformation.sleeping.bedroom1.airmattress =
          req.body.homeinformation.sleeping.bedroom1.airmattress ||
          home.homeinformation.sleeping.bedroom1.airmattress;

        home.homeinformation.sleeping.bedroom2.twin =
          req.body.homeinformation.sleeping.bedroom2.twin ||
          home.homeinformation.sleeping.bedroom2.twin;
        home.homeinformation.sleeping.bedroom2.queen =
          req.body.homeinformation.sleeping.bedroom2.queen ||
          home.homeinformation.sleeping.bedroom2.queen;
        home.homeinformation.sleeping.bedroom2.king =
          req.body.homeinformation.sleeping.bedroom2.king ||
          home.homeinformation.sleeping.bedroom2.king;
        home.homeinformation.sleeping.bedroom2.couch =
          req.body.homeinformation.sleeping.bedroom2.couch ||
          home.homeinformation.sleeping.bedroom2.couch;
        home.homeinformation.sleeping.bedroom2.airmattress =
          req.body.homeinformation.sleeping.bedroom2.airmattress ||
          home.homeinformation.sleeping.bedroom2.airmattress;

        home.homeinformation.sleeping.bedroom3.twin =
          req.body.homeinformation.sleeping.bedroom3.twin ||
          home.homeinformation.sleeping.bedroom3.twin;
        home.homeinformation.sleeping.bedroom3.queen =
          req.body.homeinformation.sleeping.bedroom3.queen ||
          home.homeinformation.sleeping.bedroom3.queen;
        home.homeinformation.sleeping.bedroom3.king =
          req.body.homeinformation.sleeping.bedroom3.king ||
          home.homeinformation.sleeping.bedroom3.king;
        home.homeinformation.sleeping.bedroom3.couch =
          req.body.homeinformation.sleeping.bedroom3.couch ||
          home.homeinformation.sleeping.bedroom3.couch;
        home.homeinformation.sleeping.bedroom3.airmattress =
          req.body.homeinformation.sleeping.bedroom3.airmattress ||
          home.homeinformation.sleeping.bedroom3.airmattress;

        home.homeinformation.sleeping.bedroom4.twin =
          req.body.homeinformation.sleeping.bedroom4.twin ||
          home.homeinformation.sleeping.bedroom4.twin;
        home.homeinformation.sleeping.bedroom4.queen =
          req.body.homeinformation.sleeping.bedroom4.queen ||
          home.homeinformation.sleeping.bedroom4.queen;
        home.homeinformation.sleeping.bedroom4.king =
          req.body.homeinformation.sleeping.bedroom4.king ||
          home.homeinformation.sleeping.bedroom4.king;
        home.homeinformation.sleeping.bedroom4.couch =
          req.body.homeinformation.sleeping.bedroom4.couch ||
          home.homeinformation.sleeping.bedroom4.couch;
        home.homeinformation.sleeping.bedroom4.airmattress =
          req.body.homeinformation.sleeping.bedroom4.airmattress ||
          home.homeinformation.sleeping.bedroom4.airmattress;

        home.homeinformation.sleeping.bedroom5.twin =
          req.body.homeinformation.sleeping.bedroom5.twin ||
          home.homeinformation.sleeping.bedroom5.twin;
        home.homeinformation.sleeping.bedroom5.queen =
          req.body.homeinformation.sleeping.bedroom5.queen ||
          home.homeinformation.sleeping.bedroom5.queen;
        home.homeinformation.sleeping.bedroom5.king =
          req.body.homeinformation.sleeping.bedroom5.king ||
          home.homeinformation.sleeping.bedroom5.king;
        home.homeinformation.sleeping.bedroom5.couch =
          req.body.homeinformation.sleeping.bedroom5.couch ||
          home.homeinformation.sleeping.bedroom5.couch;
        home.homeinformation.sleeping.bedroom5.airmattress =
          req.body.homeinformation.sleeping.bedroom5.airmattress ||
          home.homeinformation.sleeping.bedroom5.airmattress;

        home.homeinformation.sleeping.common.twin =
          req.body.homeinformation.sleeping.common.twin ||
          home.homeinformation.sleeping.common.twin;
        home.homeinformation.sleeping.common.queen =
          req.body.homeinformation.sleeping.common.queen ||
          home.homeinformation.sleeping.common.queen;
        home.homeinformation.sleeping.common.king =
          req.body.homeinformation.sleeping.common.king ||
          home.homeinformation.sleeping.common.king;
        home.homeinformation.sleeping.common.couch =
          req.body.homeinformation.sleeping.common.couch ||
          home.homeinformation.sleeping.common.couch;
        home.homeinformation.sleeping.common.airmattress =
          req.body.homeinformation.sleeping.common.airmattress ||
          home.homeinformation.sleeping.common.airmattress;

        home.homeinformation.bathrooms =
          req.body.homeinformation.bathrooms || home.homeinformation.bathrooms;

        home.homeinformation.rules.smoking =
          req.body.homeinformation.rules.smoking ||
          home.homeinformation.rules.smoking;
        home.homeinformation.rules.pets =
          req.body.homeinformation.rules.pets ||
          home.homeinformation.rules.pets;
        home.homeinformation.rules.parties =
          req.body.homeinformation.rules.parties ||
          home.homeinformation.rules.parties;
        home.homeinformation.rules.checkin =
          req.body.homeinformation.rules.checkin ||
          home.homeinformation.rules.checkin;
        home.homeinformation.rules.checkout =
          req.body.homeinformation.rules.checkout ||
          home.homeinformation.rules.checkout;
        home.homeinformation.rules.selfcheckin =
          req.body.homeinformation.rules.selfcheckin ||
          home.homeinformation.rules.selfcheckin;
        home.homeinformation.rules.comments =
          req.body.homeinformation.rules.comments ||
          home.homeinformation.rules.comments;

        home.homeinformation.minimumstay =
          req.body.homeinformation.minimumstay ||
          home.homeinformation.minimumstay;
        home.homeinformation.cancellation =
          req.body.homeinformation.cancellation ||
          home.homeinformation.cancellation;
        home.homeinformation.description =
          req.body.homeinformation.description ||
          home.homeinformation.description;
        home.homeinformation.homespace =
          req.body.homeinformation.homespace || home.homeinformation.homespace;
        home.homeinformation.guestaccess =
          req.body.homeinformation.guestaccess ||
          home.homeinformation.guestaccess;
        home.homeinformation.interaction =
          req.body.homeinformation.interaction ||
          home.homeinformation.interaction;
        home.homeinformation.othernotes =
          req.body.homeinformation.othernotes ||
          home.homeinformation.othernotes;

        home.homeinformation.amenities.pets =
          req.body.homeinformation.amenities.pets ||
          home.homeinformation.amenities.pets;
        home.homeinformation.amenities.elevator =
          req.body.homeinformation.amenities.elevator ||
          home.homeinformation.amenities.elevator;
        home.homeinformation.amenities.doorman =
          req.body.homeinformation.amenities.doorman ||
          home.homeinformation.amenities.doorman;
        home.homeinformation.amenities.kids =
          req.body.homeinformation.amenities.kids ||
          home.homeinformation.amenities.kids;
        home.homeinformation.amenities.smoking =
          req.body.homeinformation.amenities.smoking ||
          home.homeinformation.amenities.smoking;
        home.homeinformation.amenities.kitchen =
          req.body.homeinformation.amenities.kitchen ||
          home.homeinformation.amenities.kitchen;
        home.homeinformation.amenities.intercom =
          req.body.homeinformation.amenities.intercom ||
          home.homeinformation.amenities.intercom;
        home.homeinformation.amenities.internet =
          req.body.homeinformation.amenities.internet ||
          home.homeinformation.amenities.internet;
        home.homeinformation.amenities.events =
          req.body.homeinformation.amenities.events ||
          home.homeinformation.amenities.events;
        home.homeinformation.amenities.parking =
          req.body.homeinformation.amenities.parking ||
          home.homeinformation.amenities.parking;
        home.homeinformation.amenities.hottub =
          req.body.homeinformation.amenities.hottub ||
          home.homeinformation.amenities.hottub;
        home.homeinformation.amenities.wheelchair =
          req.body.homeinformation.amenities.wheelchair ||
          home.homeinformation.amenities.wheelchair;

        home.homeinformation.amenities.cable =
          req.body.homeinformation.amenities.cable ||
          home.homeinformation.amenities.cable;
        home.homeinformation.amenities.gym =
          req.body.homeinformation.amenities.gym ||
          home.homeinformation.amenities.gym;
        home.homeinformation.amenities.breakfast =
          req.body.homeinformation.amenities.breakfast ||
          home.homeinformation.amenities.breakfast;
        home.homeinformation.amenities.fireplace =
          req.body.homeinformation.amenities.fireplace ||
          home.homeinformation.amenities.fireplace;
        home.homeinformation.amenities.dryer =
          req.body.homeinformation.amenities.dryer ||
          home.homeinformation.amenities.dryer;
        home.homeinformation.amenities.laptop =
          req.body.homeinformation.amenities.laptop ||
          home.homeinformation.amenities.laptop;
        home.homeinformation.amenities.pool =
          req.body.homeinformation.amenities.pool ||
          home.homeinformation.amenities.pool;
        home.homeinformation.amenities.washer =
          req.body.homeinformation.amenities.washer ||
          home.homeinformation.amenities.washer;
        home.homeinformation.amenities.tv =
          req.body.homeinformation.amenities.tv ||
          home.homeinformation.amenities.tv;
        home.homeinformation.amenities.iron =
          req.body.homeinformation.amenities.iron ||
          home.homeinformation.amenities.iron;
        home.homeinformation.amenities.hangers =
          req.body.homeinformation.amenities.hangers ||
          home.homeinformation.amenities.hangers;

        home.homeinformation.amenities.essentials =
          req.body.homeinformation.amenities.essentials ||
          home.homeinformation.amenities.essentials;
        home.homeinformation.amenities.hairdryer =
          req.body.homeinformation.amenities.hairdryer ||
          home.homeinformation.amenities.hairdryer;
        home.homeinformation.amenities.ac =
          req.body.homeinformation.amenities.ac ||
          home.homeinformation.amenities.ac;
        home.homeinformation.amenities.shampoo =
          req.body.homeinformation.amenities.shampoo ||
          home.homeinformation.amenities.shampoo;
        home.homeinformation.amenities.heating =
          req.body.homeinformation.amenities.heating ||
          home.homeinformation.amenities.heating;
        home.homeinformation.amenities.streetparking =
          req.body.homeinformation.amenities.streetparking ||
          home.homeinformation.amenities.streetparking;
        home.homeinformation.amenities.privent =
          req.body.homeinformation.amenities.privent ||
          home.homeinformation.amenities.privent;
        home.homeinformation.amenities.ethernet =
          req.body.homeinformation.amenities.ethernet ||
          home.homeinformation.amenities.ethernet;
        home.homeinformation.amenities.paidparking =
          req.body.homeinformation.amenities.paidparking ||
          home.homeinformation.amenities.paidparking;

        home.homeinformation.familyamenities.babybath =
          req.body.homeinformation.familyamenities.babybath ||
          home.homeinformation.familyamenities.babybath;
        home.homeinformation.familyamenities.babymonitor =
          req.body.homeinformation.familyamenities.babymonitor ||
          home.homeinformation.familyamenities.babymonitor;
        home.homeinformation.familyamenities.babysitter =
          req.body.homeinformation.familyamenities.babysitter ||
          home.homeinformation.familyamenities.babysitter;
        home.homeinformation.familyamenities.changingtable =
          req.body.homeinformation.familyamenities.changingtable ||
          home.homeinformation.familyamenities.changingtable;
        home.homeinformation.familyamenities.toys =
          req.body.homeinformation.familyamenities.toys ||
          home.homeinformation.familyamenities.toys;
        home.homeinformation.familyamenities.dinnerware =
          req.body.homeinformation.familyamenities.dinnerware ||
          home.homeinformation.familyamenities.dinnerware;
        home.homeinformation.familyamenities.crib =
          req.body.homeinformation.familyamenities.crib ||
          home.homeinformation.familyamenities.crib;
        home.homeinformation.familyamenities.fireplaceguards =
          req.body.homeinformation.familyamenities.fireplaceguards ||
          home.homeinformation.familyamenities.fireplaceguards;
        home.homeinformation.familyamenities.gameconsole =
          req.body.homeinformation.familyamenities.gameconsole ||
          home.homeinformation.familyamenities.gameconsole;
        home.homeinformation.familyamenities.highchair =
          req.body.homeinformation.familyamenities.highchair ||
          home.homeinformation.familyamenities.highchair;
        home.homeinformation.familyamenities.outletcovers =
          req.body.homeinformation.familyamenities.outletcovers ||
          home.homeinformation.familyamenities.outletcovers;
        home.homeinformation.familyamenities.packnplay =
          req.body.homeinformation.familyamenities.packnplay ||
          home.homeinformation.familyamenities.packnplay;
        home.homeinformation.familyamenities.shades =
          req.body.homeinformation.familyamenities.shades ||
          home.homeinformation.familyamenities.shades;
        home.homeinformation.familyamenities.stairgate =
          req.body.homeinformation.familyamenities.stairgate ||
          home.homeinformation.familyamenities.stairgate;
        home.homeinformation.familyamenities.tablecorners =
          req.body.homeinformation.familyamenities.tablecorners ||
          home.homeinformation.familyamenities.tablecorners;
        home.homeinformation.familyamenities.windowguards =
          req.body.homeinformation.familyamenities.windowguards ||
          home.homeinformation.familyamenities.windowguards;

        home.homeinformation.safetyfeatures.smoke =
          req.body.homeinformation.safetyfeatures.smoke ||
          home.homeinformation.safetyfeatures.smoke;
        home.homeinformation.safetyfeatures.firstaid =
          req.body.homeinformation.safetyfeatures.firstaid ||
          home.homeinformation.safetyfeatures.firstaid;
        home.homeinformation.safetyfeatures.fire =
          req.body.homeinformation.safetyfeatures.fire ||
          home.homeinformation.safetyfeatures.fire;

        home.images = req.body.images || home.images;

        home.reviewAvg.avg = req.body.reviewAvg.avg || home.reviewAvg.avg;
        home.reviewAvg.accuracy =
          req.body.reviewAvg.accuracy || home.reviewAvg.accuracy;
        home.reviewAvg.communication =
          req.body.reviewAvg.communication || home.reviewAvg.communication;
        home.reviewAvg.cleanliness =
          req.body.reviewAvg.cleanliness || home.reviewAvg.cleanliness;
        home.reviewAvg.location =
          req.body.reviewAvg.location || home.reviewAvg.location;
        home.reviewAvg.checkin =
          req.body.reviewAvg.checkin || home.reviewAvg.checkin;
        home.reviewAvg.value = req.body.reviewAvg.value || home.reviewAvg.value;

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
        boundary: req.body.homeinformation.boundary,
        price: {
          weekday: req.body.homeinformation.price.weekday,
          weekend: req.body.homeinformation.price.weekend,
          extra: req.body.homeinformation.price.extra,
          extraminguest: req.body.homeinformation.price.extraminguest,
          cleaning: req.body.homeinformation.price.cleaning
        },
        guestlimit: req.body.homeinformation.guestlimit,
        bedrooms: req.body.homeinformation.bedrooms,
        sleeping: {
          bedroom1: {
            twin: req.body.homeinformation.sleeping.bedroom1.twin,
            queen: req.body.homeinformation.sleeping.bedroom1.queen,
            king: req.body.homeinformation.sleeping.bedroom1.king,
            couch: req.body.homeinformation.sleeping.bedroom1.couch,
            airmattress: req.body.homeinformation.sleeping.bedroom1.airmattress
          },
          bedroom2: {
            twin: req.body.homeinformation.sleeping.bedroom2.twin,
            queen: req.body.homeinformation.sleeping.bedroom2.queen,
            king: req.body.homeinformation.sleeping.bedroom2.king,
            couch: req.body.homeinformation.sleeping.bedroom2.couch,
            airmattress: req.body.homeinformation.sleeping.bedroom2.airmattress
          },
          bedroom3: {
            twin: req.body.homeinformation.sleeping.bedroom3.twin,
            queen: req.body.homeinformation.sleeping.bedroom3.queen,
            king: req.body.homeinformation.sleeping.bedroom3.king,
            couch: req.body.homeinformation.sleeping.bedroom3.couch,
            airmattress: req.body.homeinformation.sleeping.bedroom3.airmattress
          },
          bedroom4: {
            twin: req.body.homeinformation.sleeping.bedroom4.twin,
            queen: req.body.homeinformation.sleeping.bedroom4.queen,
            king: req.body.homeinformation.sleeping.bedroom4.king,
            couch: req.body.homeinformation.sleeping.bedroom4.couch,
            airmattress: req.body.homeinformation.sleeping.bedroom4.airmattress
          },
          bedroom5: {
            twin: req.body.homeinformation.sleeping.bedroom5.twin,
            queen: req.body.homeinformation.sleeping.bedroom5.queen,
            king: req.body.homeinformation.sleeping.bedroom5.king,
            couch: req.body.homeinformation.sleeping.bedroom5.couch,
            airmattress: req.body.homeinformation.sleeping.bedroom5.airmattresss
          },
          common: {
            twin: req.body.homeinformation.sleeping.common.twin,
            queen: req.body.homeinformation.sleeping.common.queen,
            king: req.body.homeinformation.sleeping.common.king,
            couch: req.body.homeinformation.sleeping.common.couch,
            airmattress: req.body.homeinformation.sleeping.common.airmattress
          }
        },
        bathrooms: req.body.homeinformation.bathrooms,
        rules: {
          smoking: req.body.homeinformation.rules.smoking,
          pets: req.body.homeinformation.rules.pets,
          parties: req.body.homeinformation.rules.parties,
          checkin: req.body.homeinformation.rules.checkin,
          checkout: req.body.homeinformation.rules.checkout,
          selfcheckin: req.body.homeinformation.rules.selfcheckin,
          comments: req.body.homeinformation.rules.comments
        },
        minimumstay: req.body.homeinformation.minimumstay,
        cancellation: req.body.homeinformation.cancellation,
        description: req.body.homeinformation.description,
        homespace: req.body.homeinformation.homespace,
        guestaccess: req.body.homeinformation.guestaccess,
        interaction: req.body.homeinformation.interaction,
        othernotes: req.body.homeinformation.othernotes,
        amenities: {
          pets: req.body.homeinformation.amenities.pets,
          elevator: req.body.homeinformation.amenities.elevator,
          doorman: req.body.homeinformation.amenities.doorman,
          kids: req.body.homeinformation.amenities.kids,
          smoking: req.body.homeinformation.amenities.smoking,
          kitchen: req.body.homeinformation.amenities.kitchen,
          intercom: req.body.homeinformation.amenities.intercom,
          internet: req.body.homeinformation.amenities.internet,
          events: req.body.homeinformation.amenities.events,
          parking: req.body.homeinformation.amenities.parking,
          hottub: req.body.homeinformation.amenities.hottub,
          wheelchair: req.body.homeinformation.amenities.wheelchair,
          cable: req.body.homeinformation.amenities.cable,
          gym: req.body.homeinformation.amenities.gym,
          breakfast: req.body.homeinformation.amenities.breakfast,
          fireplace: req.body.homeinformation.amenities.fireplace,
          dryer: req.body.homeinformation.amenities.dryer,
          laptop: req.body.homeinformation.amenities.laptop,
          pool: req.body.homeinformation.amenities.pool,
          washer: req.body.homeinformation.amenities.washer,
          tv: req.body.homeinformation.amenities.tv,
          iron: req.body.homeinformation.amenities.iron,
          hangers: req.body.homeinformation.amenities.hangers,
          essentials: req.body.homeinformation.amenities.essentials,
          hairdryer: req.body.homeinformation.amenities.hairdryer,
          ac: req.body.homeinformation.amenities.ac,
          shampoo: req.body.homeinformation.amenities.shampoo,
          heating: req.body.homeinformation.amenities.heating,
          streetparking: req.body.homeinformation.amenities.streetparking,
          privent: req.body.homeinformation.amenities.privent,
          ethernet: req.body.homeinformation.amenities.ethernet,
          paidparking: req.body.homeinformation.amenities.paidparking
        },
        familyamenities: {
          babybath: req.body.homeinformation.familyamenities.babybath,
          babymonitor: req.body.homeinformation.familyamenities.babymonitor,
          babysitter: req.body.homeinformation.familyamenities.babysitter,
          changingtable: req.body.homeinformation.familyamenities.changingtable,
          toys: req.body.homeinformation.familyamenities.toys,
          dinnerware: req.body.homeinformation.familyamenities.dinnerware,
          crib: req.body.homeinformation.familyamenities.crib,
          fireplaceguards:
            req.body.homeinformation.familyamenities.fireplaceguards,
          gameconsole: req.body.homeinformation.familyamenities.gameconsole,
          highchair: req.body.homeinformation.familyamenities.highchair,
          outletcovers: req.body.homeinformation.familyamenities.outletcovers,
          packnplay: req.body.homeinformation.familyamenities.packnplay,
          shades: req.body.homeinformation.familyamenities.shades,
          stairgate: req.body.homeinformation.familyamenities.stairgate,
          tablecorners: req.body.homeinformation.familyamenities.tablecorners,
          windowguards: req.body.homeinformation.familyamenities.windowguards
        },
        safetyfeatures: {
          smoke: req.body.homeinformation.safetyfeatures.smoke,
          firstaid: req.body.homeinformation.safetyfeatures.firstaid,
          fire: req.body.homeinformation.safetyfeatures.fire
        }
      },
      images: [req.body.images],
      reviewAvg: {
        avg: req.body.reviewAvg.avg,
        accuracy: req.body.reviewAvg.accuracy,
        communication: req.body.reviewAvg.communication,
        cleanliness: req.body.reviewAvg.cleanliness,
        location: req.body.reviewAvg.location,
        checkin: req.body.reviewAvg.checkin,
        value: req.body.reviewAvg.value
      },
      reviews: [req.body.reviews],
      booking: [req.body.booking]
    }).save();
  });
};
