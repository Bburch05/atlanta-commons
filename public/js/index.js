var $postTitle = $("#post-title");
var $text = $("#detail-text");
var $address = $("#address");
var $neighborhood = $("#neighborhood");
var $submitBtn = $("#newPost");

// The API object contains methods for each kind of request we'll make
$(document).on("change", "#post-image", function(event) {
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

var API = {
  savePost: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post)
    });
  },
  saveCmt: function(cmt, id) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/comments/ " + id,
      data: JSON.stringify(cmt)
    });
  },
  getPosts: function() {
    return $.ajax({
      url: "api/posts/",
      type: "GET"
    });
  },
  getPostCmt: function(id) {
    return $.ajax({
      url: "/api4/postsCmt/" + id,
      type: "GET"
    });
  },
  getEvents: function() {
    return $.ajax({
      url: "api/event/",
      type: "GET"
    });
  },
  getIssues: function() {
    return $.ajax({
      url: "api/issue/",
      type: "GET"
    });
  },
  deletePost: function(id) {
    return $.ajax({
      url: "api/posts/" + id,
      type: "DELETE"
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  //placeholder for file upload
  var userImage = userPic;
  //placeholder for User Id

  var post = {
    title: $postTitle.val(),
    text: $text.val(),
    postType: "issue",
    image: userImage,
    address: $address.val(),
    neighborhood: $neighborhood.val()
  };

  if (!(post.text && post.title && post.address)) {
    alert("You must enter an title and address to your post and some details!");
    return;
  }

  API.savePost(post).then(function() {
    location.reload();
  });

  $postTitle.val("");
  $text.val("");
  $address.val("");
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

var gbid;

$(".addbtn").on("click", function(event) {
  event.preventDefault();
  gbid = $(this).data("id");
});

$(".addNewCmt").on("click", function(event) {
  event.preventDefault();
  var userText = $("#cmtText").val();
  //placeholder for User Id
  var userId = 2;
  var id = gbid;
  var cmt = {
    text: userText,
    UserId: userId,
    PostId: id
  };

  API.saveCmt(cmt, id).then(function() {
    location.reload();
  });

  $("#cmtText").val("");
});
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

$(".ViewCmt").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  API.getPostCmt(id).then(function(data) {
    console.log(data);
    var res = data.Comments;
    for (var i = 0; i < res.length; i++) {
      var div = $("<div>");
      var h4 = $("<h4>");
      var img = $("<img>");
      var p = $("<p>");
      img.attr("src", "/imges/a2.png");
      // img.attr('height',"70px");
      // img.attr('width',"70px");
      img.addClass("imgcmt");
      img.appendTo(div);

      // h5.text("Title: "+data.title);
      // h5.addClass("h5cmt")
      // h5.appendTo(div);
      p.text("Text: " + data.Comments[i].text);
      p.addClass("pcmt");
      p.appendTo(div);

      h4.text(
        "Comment By: " +
          data.Comments[i].User.firstName +
          " " +
          data.Comments[i].User.lastName +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          "On: " +
          data.Comments[i].createdAt
      );
      h4.addClass("h4cmt");
      h4.appendTo(div);
      $(".bodycmt").prepend(div);
    }
  });
});

$(".speechbtn").on("click", function(event) {
  event.preventDefault();
  console.log("hi");

  if ("speechSynthesis" in window) {
    var NewText = $(this).data("text");
    console.log(NewText);
    var msg = new SpeechSynthesisUtterance(NewText);
    window.speechSynthesis.speak(msg);
  }
});
