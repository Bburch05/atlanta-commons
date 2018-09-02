var db = require("../models");

module.exports = function(app) {
  // Get all Posts
  app.get("/api/posts/:offset?/", function(req, res) {
    var queryOffset;
    if (!req.params.offset) {
      queryOffset = 0;
    } else {
      queryOffset = parseInt(req.params.offset);
    }

    db.Post.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      offset: queryOffset,
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        },
        db.Comments
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  //Get the 10 most recent posts with either the ["event" or "issue"] PostType from an offset
  app.get("/api/:postType/:offset?/", function(req, res) {
    var queryOffset;
    if (!req.params.offset) {
      queryOffset = 0;
    } else {
      queryOffset = parseInt(req.params.offset);
    }

    var searchPostType = req.params.postType.toLowerCase();

    db.Post.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      offset: queryOffset,
      where: {
        postType: searchPostType
      },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        },
        db.Comments
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        },
        {
          model: db.Comments,
          include: {
            model: db.Users,
            attributes: ["username", "profPic", "firstName", "lastName"]
          }
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.Users.findOne({
      where: { id: req.params.id }
    }).then(function(result) {
      res.json(result);
    });
  });
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(result) {
      res.json(result);
      console.log(result);
    });
  });

  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      neighborhood: req.body.neighborhood,
      profPic: req.body.profPic
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/comments/:PostId", function(req, res) {
    db.Comments.create({
      PostId: req.params.PostId,
      text: req.body.text,
      UserId: req.body.UserId
    }).then(function(result) {
      res.json(result);
    });
  });

  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: { id: req.params.id }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({
      where: { id: req.params.id }
    }).then(function(result) {
      res.json(result);
    });
  });
};
