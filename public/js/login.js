
$(document).on("change", "#profile-pic", function(event) {
  event.preventDefault();
  createPic(event);
});

function createPic(event) {
  var cloudPreset = "qie6uzuq";
  var imgUpload = event.target.files[0];
  var formData = new FormData();
  formData.append("file", imgUpload);
  formData.append("upload_preset", cloudPreset);
  uploadPicture(formData);
}

function uploadPicture(formData) {
  var cloudURL = "https://api.cloudinary.com/v1_1/atlanta-commons/upload";
  axios({
    url: cloudURL,
    method: "POST",
    headers: {
      // baseURL: process.env.cloudURL,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formData
  })
    .then(function(res) {
      userPic = res.data.secure_url;
      return userPic;
    })
    .catch(function(err) {
      console.log(err);
    });
}

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
    userPic: userPic,
    neighborhood: $("#signup-neighborhood")
      .val()
      .trim()
  };
  $.post("/signup", newUser, function(data, status) {
    console.log(status);
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
  console.log(userPswd);
  var user = {
    username: userName,
    password: userPswd
  };

  $.post("/signin", user, function(data, status) {
    console.log(status);
  });
});
