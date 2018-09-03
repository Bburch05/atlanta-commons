// Get references to page elements
// var $postTitle = $("#post-title");
// var $text = $("#detail-text");
// var $address = $("#address");
// var $neighborhood = $("#neighborhood");
var $submitBtnUser = $(".div1");

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
  },
  getAllUsers: function() {
    return $.ajax({
      url: "/api/Allusers",
      type: "GET"
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
var getAllUsers = function(event) {
  event.preventDefault();
  API.getAllUsers().then(function() {
    location.reload();
  });

  //placeholder for file upload
  //placeholder for User Id
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
$submitBtnUser.on("click", getAllUsers);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

$(".remOVe").on("click", function(event) {
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/users/" + id, {
    type: "DELETE"
  }).then(
    function() {
      console.log("Row Deleted");
      // Reload the page to get the updated list
      location.reload();
    }
  );
});