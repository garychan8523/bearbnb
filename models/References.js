const mongoose = require("mongoose");
const { Schema } = mongoose;

const referenceSchema = new Schema({
  hostid: String,
  referenceid: Number,
  referencedate: Number,
  stars: Number, // Out of 5 stars
  content: String,
  referenceerId: String,
  firstName: String,
  lastName: String,
  location: {
    city: String,
    state: String
  }
});

mongoose.model("references", referenceSchema);
