$(document).ready(function() {

  // Change the font size accorind to the changes made by user.
  // Also re-calculates values for new font family
  $("#font-family").change(function() {
    var font = $("#font-family").val();
    $('#styled-text').css("font-family", font);
    $('#ws, #is').each(function() {
      $(this).css("font-family", font);
    });
    calc();
  });

  // Call calc() when document is first loaded
  // to start with already set Text
  calc();

  // Onclick listener for text size button
  $("#btn-text-size").click(function() {
    calc();
  })

  /*
   *  Calculates properties of text based on font size and
   *  chosen Typeface.
   */
  function calc() {
    // Verify entered value
    if(!$("#font-size").length) {
      throw new Error("Font Size Element not found");
    }
    if($("#font-size").val() <= 0) {
      throw new Error("Font Size must be bigger than 0");
    }
    if(!$.isNumeric($("#font-size").val())) {
      throw new Error("Font Size must be a number");
    }

    // Get set font size and calculate optimal line height
    var fontSize = $("#font-size").val();
    var lineHeight = Math.round(fontSize * 1.4);

    // DEBUG
    console.log('Text Size: ' + fontSize);
    console.log('Line Height: ' + lineHeight);

    // Store reference to texts used to calculate char width
    var $ws = $("#ws");
    var $is = $("#is");

    // Calculate character widths for w's and i's
    var wCharWidth = getCharWidth(adjustElementWidth($ws, fontSize));
    var iCharWidth = getCharWidth(adjustElementWidth($is, fontSize));

    // Calculate optimal content width
    var averageWidth = (wCharWidth + iCharWidth) / 2;
    console.log(averageWidth); // DEBUG

    var optimalContentWidth = averageWidth * 90;
    console.log(optimalContentWidth); // DEBUG

    // Calculate headline size
    var headlines = generateHeadlines(fontSize, 3);
    console.log(headlines); // DEBUG

    // Style text according to calculated values
    styleText(fontSize, lineHeight, optimalContentWidth, headlines);
    setValues(fontSize, lineHeight, optimalContentWidth, headlines);
  }


  /**
   *  Fills an Element with Characters so that the Element is as close as possible
   *  to a width of 300px.
   */
  function adjustElementWidth(element, fontSize) {
    // Verify variables
    if(!(element.length)) {
      throw new Error("Font Size Element not found");
    }
    if(!$.isNumeric(fontSize)) {
      throw new Error("Font Size must be a number");
    }
    if(fontSize <= 0) {
      throw new Error("Font Size must be bigger than 0");
    }

    // Remove whitespace from text
    var elementContent = element.html().replace(/\s/g, '');

    // Set font size of text example according to what
    // the user defined
    var fontSizeString = fontSize + "px";
    element.css("font-size", fontSizeString);

    // DEBUG
    console.log(elementContent);
    console.log('Width of Element at start: ' + element.outerWidth());
    console.log('Content length at start: ' + elementContent.length);

    // Calculate width of one character
    var singleCharWidth = getCharWidth(element);
    console.log('Width of a single character: ' + singleCharWidth);

    // Calculate how many chars will fit in 300px width
    var numChars = Math.floor((300 - (300 % singleCharWidth)) / singleCharWidth);
    console.log(numChars);

    // Create new string according to calculated values
    var newContent = elementContent.substring(0, numChars);
    console.log(newContent);
    console.log('Measured length of new Content: ' + newContent.length);

    // Populate Element with new content
    element.html(newContent);
    console.log(element.outerWidth());

    return element;
  }


  /**
   *  Calculates the average width of a single character in the given element.
   */
  function getCharWidth(element) {
    // Verify variable
    if(!(element.length)) {
      throw new Error("Font Size Element not found");
    }

    var elementContent = element.html().replace(/\s/g, '');
    var elementLength = element.html().length;
    var elementWidth = element.outerWidth();

    return elementWidth / elementLength;
  }

  /*
   *  Generates three levels of headlines sizes
   *  calculated absed on the body text size
   */
  function generateHeadlines(fontSize, numberHeadlines) {
    // Verify variables
    if(fontSize <= 0) {
      throw new Error("Font Size must be bigger than 0");
    }
    if(numberHeadlines <= 0) {
      throw new Error("Number of Headlines must be bigger than 0");
    }

    // Setup
    var goldenRatio = 1.62;
    var typographicScale = [6,7,8,9,10,11,12,14,16,18,21,24,36,48,60];

    var exactH1Size = fontSize * goldenRatio;
    console.log('Exact Size: ' + exactH1Size); // DEBUG

    // DANGER ZONE: What if h1Pos is 0?
    var h1Pos = getClosestValuePositionFromArray(exactH1Size, typographicScale);
    var h2Pos = h1Pos - 1;
    var h3Pos = h1Pos - 2;

    // DEBUG
    console.log('H1: ' + typographicScale[h1Pos]);
    console.log('H2: ' + typographicScale[h2Pos]);
    console.log('H3: ' + typographicScale[h3Pos]);

    // Setup headline objects
    var h1 = {size: typographicScale[h1Pos] + 'px'}
    var h2 = {size: typographicScale[h2Pos] + 'px'}
    var h3 = {size: typographicScale[h3Pos] + 'px'}

    return {h1: h1, h2: h2, h3: h3}
  }

  /*
   *  Takes a value and an array as arguments.
   *  Determines which value in the array is closest to the given one
   *  NOTE: Does not check *if* the value is in array, nor if the types
   *  match.
   */
  function getClosestValuePositionFromArray(exactValue, array) {
    // Verify variables
    if(typeof exactValue == 'undefined') {
      throw new Error("Exact Value not defined");
    }
    if(array.length <=0) {
      throw new Error("Array ha no content");
    }

    for (var i = 0; i < array.length; i++) {
      console.log('Current position: ' + array[i]); // DEBUG

      // Check if the next bigger number was found
      if(array[i] > exactValue) {
        var upper = array[i];
        var lower = array[i - 1];

        // Calculate differences to upper and lower neighbour
        var upperDiff = upper - exactValue;
        var lowerDiff = exactValue - lowerDiff;

        // Determine which neighbour is the closest
        if(upperDiff > lowerDiff) {
          console.log('Closest Value: ' + lower);
          return i - 1;
        } else {
          console.log('Closest Value: ' + upper);
          return i;
        }
      }
    }

    // Return null if no match was found
    return null;
  }

  /*
   *  Styles the entire example text based on the earlier calculated
   *  values.
   */
  function styleText(fontSize, lineHeight, contentWidth, headlines) {
    // Setup
    var fontSizeString = fontSize + 'px';
    var lineHeightString = lineHeight + 'px';
    var contentWidthString = contentWidth + 'px';
    var pPaddingString = (lineHeight / 2) + 'px';
    var bigHeadlinePaddingString = (lineHeight * 2.5) + 'px';
    var mediumHeadlinePaddingString = (lineHeight * 1.5) + 'px';
    var smallHeadlinePaddingString = (lineHeight * 0.5) + 'px';

    // Style text basics
    var textDiv = $('#styled-text');
    textDiv.css({"font-size": fontSizeString,
                 "line-height": lineHeightString,
                 "max-width": contentWidthString});

    textDiv.find('p').css({"padding-top": pPaddingString,
                           "padding-bottom": pPaddingString});

    // Style headlines
    var h1 = textDiv.find('h1');
    var h2 = textDiv.find('h2');
    var h3 = textDiv.find('h3');

    h1.css({"padding-top": bigHeadlinePaddingString,
             "padding-bottom": smallHeadlinePaddingString,
             "font-size": headlines.h1.size});

    h2.css({"padding-top": bigHeadlinePaddingString,
            "padding-bottom": smallHeadlinePaddingString,
            "font-size": headlines.h2.size});

    h3.css({"padding-top": mediumHeadlinePaddingString,
            "padding-bottom": smallHeadlinePaddingString,
            "font-size": headlines.h3.size});
  }

  $(".btn-manipulate").click(function() {

    // Setup
    let targetElement = $(this).data("target");
    let type = $(this).data("type");
    let attribute = $(this).data("attribute");
    let targetElements = $("#styled-text").children(targetElement);
    let currSize = parseInt($(targetElements).css(attribute), 10);

    let adjustedSize;

    switch (type) {
      case 'increase':
        adjustedSize = currSize + 1;
        break;
      case 'decrease':
        adjustedSize = currSize - 1;
        break;
      default:
        adjustedSize = currSize;
    }

    $(targetElements).css(attribute, adjustedSize + "px");
    $("#font-size").val(adjustedSize);
    calc();
  });

})


/*
 *  Displays calculate values
 */
function setValues(fontSize, lineHeight, contentWidth, headlines) {
  console.log("setValues called");
  $("#bodySize").html(fontSize + "px");
  $("#lineHeight").html(lineHeight + "px");
  $("#contentWidth").html(Math.round(contentWidth) + "px");
  $("#h1Size").html(headlines.h1.size);
  $("#h2Size").html(headlines.h2.size);
  $("#h3Size").html(headlines.h3.size);
}
