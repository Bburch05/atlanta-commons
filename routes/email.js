const nodemailer = require("nodemailer");

//Gmail post
module.exports = function(app) {
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
};
