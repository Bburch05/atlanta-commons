var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if(req.user){
      console.log(req.user);
    }
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
  var object;
  var object2;
  var object3;
  var object4;
  app.get("/a/:n?", function(req, res) {
    db.Users.findAll({}).then(function(result) {
      object = { person: result };
    });
    db.Post.findAll({
      where: { postType: "issue" },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        }
      ]
    }).then(function(result) {
      object2 = { person2: result };
    });
    db.Post.findAll({
      where: { postType: "event" },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        }
      ]
    }).then(function(result) {
      object3 = { person3: result };
    });
    db.Post.findAll({
      where: { neighborhood: req.params.n }
    }).then(function(result) {
      object4 = { person4: result };
    });
    var headob = {
      user: object,
      issue: object2,
      event: object3,
      neigh: object4
    };

    res.render("a", headob);
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
