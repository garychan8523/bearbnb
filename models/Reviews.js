const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  hostid: String,
  reviewid: Number,
  reviewdate: Number,
  stars: Number, // Out of 5 stars
  content: String,
  reviewerId: String,
  firstName: String,
  lastName: String,
  location: {
    city: String,
    state: String
  }
});

mongoose.model("reviews", reviewSchema);
