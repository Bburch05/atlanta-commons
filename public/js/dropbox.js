var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/atlanta-commons/upload";
var CLOUDINARY_UPLOAD_PRESET = "qie6uzuq";
//Need to match up to the div with the User image tag
var imgThumbnail = $("#userPic");
//Need to match up with the picture upload input
var imgUpload = $("#profile-pic");

$(document).on("click", "#btn-signup", function(event) {
  console.log("HI");
  event.preventDefault();
  var userPic = imgUpload.src();
  var formData = new FormData();
  console.log(userPic);
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
      document.cookie = "userId=" + data.id
    }
  });
});

//export the user info we get back so we can populate posts etc
//module.exports = data;
