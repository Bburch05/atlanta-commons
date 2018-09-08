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
      $("#profile-pic").text(userPic);
    })
    .catch(function(err) {
      console.log(err);
    });
}

$("#signup-firstName").bind("keyup blur", function() {
  var node = $(this);
  node.val(node.val().replace(/[^a-z ]/g, ""));
});

$("#signup-lastName").bind("keyup blur", function() {
  var node = $(this);
  node.val(node.val().replace(/[^a-z ]/g, ""));
});
