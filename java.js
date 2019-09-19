alert("working!");



$("button").on("click", function() {
    var show = $(this).attr("data-show");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=8LFvwoc2nTOPcB3m1n7SAiu5Reg0HC8y&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          console.log('looping ??')
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var showImage = $("<img>");
          showImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(showImage);

          $("#gifs-go-here").prepend(gifDiv);
        }
      });
  });