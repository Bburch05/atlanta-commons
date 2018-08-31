var email = require("emailjs");

module.exports = function() {
  var server = email.server.connect({
    user: "yashkinariwalask95@gmail.com",
    password: "yash9913245256",
    host: "smtp.gmail.com",
    ssl: true
  });

  // send the message and get a callback with an error or details of the message that was sent
  server.send(
    {
      text: "i hope this works",
      from: "yashkinariwalask95@gmail.com",
      to: "yashkinariwalask95@gmail.com",
      cc: "yashkinariwalask95@gmail.com",
      subject: "testing emailjs"
    },
    function(err, message) {
      console.log(err || message);
    }
  );
};
