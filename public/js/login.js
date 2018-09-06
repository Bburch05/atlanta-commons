var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/atlanta-commons/upload";
var CLOUDINARY_UPLOAD_PRESET = "qie6uzuq";
//Need to match up to the div with the User image tag
var imgThumbnail = $("#userPic");
//Need to match up with the picture upload input
var imgUpload = $("#profile-pic");

$(document).on("click", "#btn-signup", function(event) {
  event.preventDefault();

  console.log($("#signup-firstName")
  .val()
  .trim());
  console.log($("#signup-lastName")
  .val()
  .trim());


  var newUser = {
    username: $("#signup-username")
      .val()
      .trim(),
    password: $("#signup-password")
      .val()
      .trim(),
    firstName: $("#signup-firstName")
      .val()
      .trim(),
    lastName: $("#signup-lastName")
      .val()
      .trim(),
    email: $("#signup-email")
      .val()
      .trim(),
    userPic: "https://i.imgur.com/WLSTfG6.png",
    neighborhood: $("#signup-neighborhood")
      .val()
      .trim()
  };
  $.post("/signup", newUser, function(data, status) {
    console.log(status);
    if (status === "success"){
      
    }
  });
});

$(document).on("click", "#btn-login", function(e) {
  e.preventDefault;
  var userName = $("#login-username")
    .val()
    .trim();

    console.log(userName);
  var userPswd = $("#login-password")
    .val()
    .trim();
    console.log(userPswd)
  var user = {
    username: userName,
    password: userPswd
  };

  $.post("/signin", user, function(data, status) {
    console.log(status);
    console.log(data);
  });
});