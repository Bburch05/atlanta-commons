//Need to match up to the div with the User image tag
var cloudPreset = "qie6uzuq";
var cloudURL = "https://api.cloudinary.com/v1_1/atlanta-commons/upload";

$(document).on("change", "#profile-pic", function(event) {
  event.preventDefault();
  var imgUpload = event.target.files[0];
  var formData = new FormData();
  formData.append("file", imgUpload);
  formData.append("upload_preset", cloudPreset);
  console.log(formData);
  $(document).on("click", "#btn-signup", function(event) {
    event.preventDefault();
    axios({
      url: cloudURL,
      method: "POST",
      headers: {
        baseURL: process.env.cloudURL,

        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    })
      .then(function(res) {
        var userPic = res.data.secure_url;
        $("#profile-pic").text(userPic);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
