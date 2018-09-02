var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Post.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      where: { postType: "issue" },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        }
      ]
    }).then(function(result) {
      res.render("index", { Post: result });
    });
  });

  app.get("/events", function(req, res) {
    db.Post.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      where: { postType: "event" },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        }
      ]
    }).then(function(result) {
      res.render("events", { Post: result });
    });
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
