var db = require("../models");

module.exports = function(app, passport) {
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",

      failureRedirect: "/Log",
      failureFlash: true
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/Log"
    })
  );

  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });
};