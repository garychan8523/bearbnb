const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const homeRoutes = require("./routes/homeRoutes");
const referenceRoutes = require("./routes/referenceRoutes");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
dataRoutes(app);
reviewRoutes(app);
homeRoutes(app);
referenceRoutes(app);

if (process.env.NODE_ENV === "production") {
  // Hook up express to the build files
  app.use(express.static("client/build"));

  // For unrecognized routes, serve index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// If there is an env variable, assign to port.
// Otherwise, deploy to 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
