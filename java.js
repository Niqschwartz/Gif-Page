// alert("working!");
var tvShows = ["The Office", "Cheers", "King of the Hill", "Simpsons"];

function populateButtons() {
  $("#buttons").empty();
  for (var i = 0; i < tvShows.length; i++) {
    var button = $("<button>")
    button.addClass("tvShowButton");
    button.attr("data-show", tvShows[i]);
    button.text(tvShows[i]);
    $("#buttons").append(button);

  }
}
populateButtons();
$("#addtvShow").on("click", function (event) {
  event.preventDefault();
  var newTvShow = $("input").val();
  tvShows.push(newTvShow);
  populateButtons();


})

$(document).on("click", ".tvShowButton", function () {
  var show = $(this).attr("data-show");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    show + "&api_key=8LFvwoc2nTOPcB3m1n7SAiu5Reg0HC8y&limit=5";


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        console.log('looping ??')
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        var animate = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var showImage = $("<img>");
        showImage.attr("src", animate);
        showImage.attr("data-state", "animate");
        showImage.attr("data-animate", animate);
        showImage.attr("data-still", still);
        showImage.addClass("gif");

        gifDiv.prepend(p);
        gifDiv.prepend(showImage);

        $("#gifs-go-here").prepend(gifDiv);
      }
    });
});
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");
  var stillURL = $(this).attr("data-still");
  var animateURL = $(this).attr("data-animate");
  if (state == "animate") {
    $(this).attr("src", stillURL);
    $(this).attr("data-state", "still");
  }
  if (state == "still") {
    $(this).attr("src", animateURL);
    $(this).attr("data-state", "animate");
  }
})