//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

var CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/atlanta-commons/upload";
var CLOUDINARY_UPLOAD_PRESET = "qie6uzuq";
//Need to match up to the div with the User image tag
var imgThumbnail = $("#userPic");
//Need to match up with the picture upload input
var imgUpload = $("#imgUploadInput");

imgUpload.on("click", function(event) {
  var userPic = event.target.files[0];
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

//preset name qie6uzuq
