const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  joindate: Number,
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  birthmonth: String,
  birthday: String,
  birthyear: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  school: String,
  work: String,
  languages: String,
  verified: {
    id: Boolean,
    info: Boolean,
    email: Boolean,
    phone: Boolean,
    workemail: Boolean
  },
  superuser: Boolean,
  intro: String,
  image: String,
  homeids: [String],
  reviews: [String], //this is an array of numbers that correspond to reviews collection
  references: [String], //this is an array of numbers that correspond to references collection - not yet made
  bookedHomes: [String],
  admin: Boolean
});

mongoose.model("users", userSchema);
