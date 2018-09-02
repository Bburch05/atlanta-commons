// var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    var hbsObject = {
      cats: "index"
    };
    res.render("index", hbsObject);
  });
  app.get("/events", function(req, res) {
    var hbsObject = {
      cats: "cat"
    };
    res.render("events", hbsObject);
  });
  app.get("/contact", function(req, res) {
    var hbsObject = {
      cats: "con"
    };
    res.render("contact", hbsObject);
  });
  app.get("/Log", function(req, res) {
    var hbsObject = {
      cats: "log"
    };
    res.render("Log", hbsObject);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
