$("#addiv2").hide();
$("#addiv3").hide();
$("#addiv4").hide();

$(".maindiv1").on("click", function(e) {
  e.preventDefault();
  $("#addiv2").hide();
  $("#addiv3").hide();
  $("#addiv4").hide();
  $("#addiv1").show();
  

  $.get("/api/users", function(data) {
   console.log(data);
  });

  
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



$(".remOVeissue").on("click", function(event) {
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
    var n =  $('#nei :selected').text();
    alert(n);

  // Send the DELETE request.
  $.ajax("/api/posts/" + n, {
    type: "GET"
  }).then(function() {
    // Reload the page to get the updated list
   
    location.reload();
   
   
    
  });
});
