$("#addiv1").hide();
$("#addiv2").hide();
$("#addiv3").hide();
$("#addiv4").hide();

$(".maindiv1").on("click", function(e) {
  e.preventDefault();
  $("#addiv2").hide();
  $("#addiv3").hide();
  $("#addiv4").hide();
  $("#addiv1").show();

  // $.ajax("/abc", {
  //   type: "GET"
  //   // 'success':function()
  // {
  //   window.location.href="/a";
  //   $("#addiv1").show();
  // }
  // });
});
$(".maindiv2").on("click", function(e) {
  e.preventDefault();
  $("#addiv1").hide();
  $("#addiv3").hide();
  $("#addiv4").hide();
  $("#addiv2").show();
});

$(".maindiv3").on("click", function(e) {
  e.preventDefault();
  $("#addiv2").hide();
  $("#addiv1").hide();
  $("#addiv4").hide();
  $("#addiv3").show();

  // $.ajax("/postevents", {
  //   type: "GET"
  // }).then(
  //   function () {
  //     // Reload the page to get the updated list
  //     location.reload();
  //     console.log("-------------------------------");
  //   }
  // );
});

$(".maindiv4").on("click", function(e) {
  e.preventDefault();
  $("#addiv2").hide();
  $("#addiv3").hide();
  $("#addiv1").hide();
  $("#addiv4").show();
});

$(".remOVeUser").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/users/" + id, {
    type: "DELETE"
    // 'success':function()
    // {
    //   setTimeout(function () {
    //     window.location.href = "/a"; //will redirect to your blog page (an ex: blog.html)
    //  }, 2000);
    // }
  }).then(function() {
    console.log("Row Deleted");
    // Reload the page to get the updated list
    location.reload();
  });
});

$(".remOVeIssue").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/posts/" + id, {
    type: "DELETE"
  }).then(function() {
    console.log("Row Deleted");
    // Reload the page to get the updated list
    location.reload();
  });
});

$(".remOVeEvent").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  // Send the DELETE request.
  $.ajax("/api/posts/" + id, {
    type: "DELETE"
  }).then(function() {
    console.log("Row Deleted");
    // Reload the page to get the updated list
    location.reload();
  });
});

$("#search").on("click", function(event) {
  event.preventDefault();
  var n = $("#nei :selected").text();
  $.ajax("/a/" + n, {
    type: "GET"
  }).then(function() {
    // Reload the page to get the updated list
    location.reload();
  });
});
