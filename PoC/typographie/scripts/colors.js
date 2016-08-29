$(document).ready(function() {
  $("#bg-color").spectrum({
    color: "#fff",
    change: function(color) {
      var colorString = color.toHexString();
      $("#display-bg-color").html(colorString);
      $("#styled-text").css("background-color", colorString);
    }
  });

  $("#fg-color").spectrum({
    color: "#000",
    change: function(color) {
      var colorString = color.toHexString();
      $("#display-fg-color").html(colorString);
      $("#styled-text").css("color", colorString);
    }
  });

})
