//wait to attach handlers until the DOM has loaded!
console.log("linked");
$(function(){
  $("#eatBurger").on("click", function(event){
    var id= $(this).data("id");
    //var devoured = $(this).data("devoured");
    //send to PUT request in js, controller
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: {devoured: true}
    }).then(
      function(){
        console.log("changed devoured state", devoured);

        //reload the page to update it
        location.reload();
      }
    );
  });


  $("#createForm").on("submit", function(event){

    event.preventDefault();

    var newBurger = {
      name: $("#burg").val().trim(),
     devoured: 0
    };

    //send to post
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function(){
        console.log("new burger!");

        location.reload();
      }
    );
  });
});


$("#remove").on("click", function(event){
  event.preventDefault();

  var id=$(this).data("id");

  $.ajax("/api/burgers/" + id,{
    type: "DELETE"
  }).then(
    function(){
      location.reload();
    }
  );
});