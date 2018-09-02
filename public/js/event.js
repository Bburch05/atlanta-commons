// Get references to page elements
var $postTitle = $("#post-title");
var $text = $("#detail-text");
var $address = $("#address");
var $neighborhood = $("#neighborhood");
var $submitBtn = $("#newPost");

// The API object contains methods for each kind of request we'll make
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
  getPosts: function() {
    return $.ajax({
      url: "api/posts/",
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

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  //placeholder for file upload
  var userImage = "https://i.imgur.com/TpqwWl6.jpg";
  //placeholder for User Id
  var posterId = 2;

  var post = {
    title: $postTitle.val(),
    text: $text.val(),
    postType: "event",
    image: userImage,
    address: $address.val(),
    neighborhood: $neighborhood.val(),
    UserId: posterId
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

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
