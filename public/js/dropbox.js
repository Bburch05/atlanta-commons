var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/atlanta-commons/upload";
var CLOUDINARY_UPLOAD_PRESET = "qie6uzuq";
//Need to match up to the div with the User image tag
var imgThumbnail = $("#userPic");
//Need to match up with the picture upload input
var imgUpload = $("#profile-pic");

$(document).on("click", "#btn-signup", function(event) {
  console.log("HI");
  event.preventDefault();
  // var userPic = imgUpload.src();
  // var formData = new FormData();
  // console.log(userPic);
  // formData.append("file", userPic);
  // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  // axios({
  //   url: CLOUDINARY_URL,
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   data: formData
  // })
  //   .then(function(res) {
  //     console.log(res);
  //     imgThumbnail.src = res.data.secure_url;
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });

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
      location.redirect("/")
    }
  });
});

$(document).on("click", "#btn-login", function(e) {
  e.preventDefault;
  var userName = $("#login-username")
    .val()
    .trim();
  var userPswd = $("#login-password")
    .val()
    .trim();
  var user = {
    username: userName,
    password: userPswd
  };

  $.post("/signin", user, function(data, status) {
    console.log(status);
  });
});

//export the user info we get back so we can populate posts etc
//module.exports = data;
