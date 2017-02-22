$(document).ready(function() {
  $("img").on("click", function() {
    // what does 'this' contain?
    console.log($(this));
  });

  // Imagination!
  $.ajax({
    url: "https://bb-election-api.herokuapp.com/",
    method: "GET",
    dataType: "json"
  }).done(function(responseData){
    console.log(responseData);
    var candidates = responseData.candidates;

    for (var i = 0; i < candidates.length; i++) {
      var li = $('<li>').append(candidates[i].name + " has " + candidates[i].votes + " votes.");

      var button = $('<button>');
      button.attr('class', 'vote-button');
      button.append("Vote to select " + candidates[i].name);
      var hiddenField = $('<input>');
      hiddenField.attr({
        type: 'hidden',
        name: 'name',
        value: candidates[i].id,
      });
      var form = $('<form class="vote-form" name="'+ candidates[i].name + '" method="POST" action="https://bb-election-api.herokuapp.com/vote">');
      form.append(hiddenField);
      form.append(button);

      li.append(form);
      $('#list').append(li);
    }
    $('form.vote-form').on('submit', function(e){
      e.preventDefault();
      console.log("asdvkjbdva");
      $.ajax({
        url: "https://bb-election-api.herokuapp.com/vote",
        method: "POST",
        data:{
          "id": $(this).children('input[type=hidden]').val()
        }
      }).done(function(responseData){
        console.log(responseData);
        console.log("200 OK");
        location.reload();
      }).fail(function(){
        alert("Failed to vote.");
      });
    });

  });

});
