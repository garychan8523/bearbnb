const mongoose = require("mongoose");
const { Schema } = mongoose;

const homesSchema = new Schema({
  hostid: String,
  homelocation: {
    address: String,
    city: String,
    state: String,
    zipcode: String,
    lat: Number,
    lng: Number
  },
  homeinformation: {
    title: String,
    price: Number,
    guestlimit: Number,
    description: String,
    othernotes: String
  },
  startTime: Date,
  endTime: Date,
  images: [String],
  reviewAvg: {
    avg: Number
  },
  reviews: [String],
  booking: [
    {
      user: String
    }
  ]
});

mongoose.model("homes", homesSchema);
