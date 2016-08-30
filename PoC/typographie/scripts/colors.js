$(document).ready(function() {
  $("#bg-color").spectrum({
    color: "#fff",
    change: function(color) {
      var colorStringHEX = color.toHexString();
      $("#display-bg-color").html(colorStringHEX);
      $("#styled-text").css("background-color", colorStringHEX);
      checkContrast();
    }
  });

  $("#fg-color").spectrum({
    color: "#000",
    change: function(color) {
      var colorStringHEX = color.toHexString();
      $("#display-fg-color").html(colorStringHEX);
      $("#styled-text").css("color", colorStringHEX);
      checkContrast();
    }
  });

  function checkContrast() {
    var bgColor = $("#bg-color").spectrum("get").toRgb();
    var fgColor = $("#fg-color").spectrum("get").toRgb();
    var colors = [bgColor, fgColor];
    var lumis = [];

    for(var i = 0; i <colors.length; i++) {
      var currColor = colors[i];

      for (var singleColor in currColor) {
        if (currColor.hasOwnProperty(singleColor)) {
          console.log(currColor[singleColor]);
          currColor[singleColor] = currColor[singleColor] / 255;
          if (currColor[singleColor] <= 0.03928) {
            currColor[singleColor] = currColor[singleColor] / 12.92;
          } else {
            currColor[singleColor] = Math.pow(((currColor[singleColor] + 0.055) / 1.055), 2.4);
          }
        }
      }

      lumis.push((0.2126 * currColor.r + 0.7152 * currColor.g + 0.0722 * currColor.b) + 0.05);
    }

    // DEBUG
    console.log("Foreground color: ");
    console.log(fgColor);

    console.log("Background color: ");
    console.log(bgColor);

    console.log("Raw luminance: ");
    console.log(lumis);

    var ratio;

    if(lumis[0] > lumis[1]) {
      var multiplicator = 1 / lumis[1];
      lumis[0] = lumis[0] * multiplicator;
      lumis[1] = lumis[1] * multiplicator;
      ratio = lumis[0];
    } else {
      var multiplicator = 1 / lumis[0];
      lumis[0] = lumis[0] * multiplicator;
      lumis[1] = lumis[1] * multiplicator;
      ratio = lumis[1];
    }

    // DEBUG
    console.log("Normalized luminnance: ");
    console.log(lumis);

    console.log("Ratio: ");
    console.log(ratio);

    if(ratio >= 7) {
      console.log("Passing AAA");
    } else if (ratio >= 4.5) {
      console.log("Passing Level AA");
    } else {
      console.log("Contrast too low");
    }
  }
})
