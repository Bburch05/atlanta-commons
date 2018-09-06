require("dotenv").config();
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
// var gmail = require("gmail-send");
// console.log(gmail);

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//Gmail post
app.post("/contact", function(req, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "acommons1234@gmail.com",
      pass: "atlantacommons"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: req.body.email,
    to: "acommons1234@gmail.com",
    subject: req.body.name,
    html: "<b>" + req.body.comments + "</b>"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email Sent: " + info.response);
  });

  res.render("contact");
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// For Passport

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app);
require("./routes/login")(app, passport);

var syncOptions = { force: false };

//Passport Strategies
require("./config/passport/passport.js")(passport, db.Users);

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
