var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/atlanta-commons/upload";
var CLOUDINARY_UPLOAD_PRESET = "qie6uzuq";
//Need to match up to the div with the User image tag
var imgThumbnail = $("#userPic");
//Need to match up with the picture upload input
var imgUpload = $("#profile-pic");

$("#btn-signup").on("click", function(event) {
  event.preventDefault();
  var userPic = imgUpload.src();
  var formData = new FormData();
  formData.append("file", userPic);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formData
  })
    .then(function(res) {
      console.log(res);
      imgThumbnail.src = res.data.secure_url;
    })
    .catch(function(err) {
      console.log(err);
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
  //   var User = {
  //     name: userName,
  //     password: userPswd
  //   };

  $.get("/api/users/" + userName, function(data) {
    if (!data) {
      console.log("We looked but couldnt find anything");
    } else {
      console.log(data);
    }
  });
});
