$(document).ready(function() {

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
  }


  /**
   *  Fills an Element with Characters so that the Element is as close as possible
   *  to a width of 300px.
   */
  function adjustElementWidth(element, fontSize) {
    // TODO: Verify variables
    // TODO: Refactor

    // Remove whitespace from text
    // var elementContent = element.innerHTML.replace(/\s/g, '');
    var elementContent = element.html().replace(/\s/g, '');

    // Set font size of text example according to what
    // the user defined
    // element.style.fontSize = fontSize + "px";
    var fontSizeString = fontSize + "px";
    element.css("font-size", fontSizeString);

    // DEBUG
    console.log(elementContent);
    console.log('Width of Element at start: ' + element.offsetWidth);
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
    element.innerHTML = newContent;
    console.log(element.offsetWidth);

    return element;
  }


  /**
   *  Calculates the average width of a single character in the given element.
   */
  function getCharWidth(element) {
    // TODO: Verify variables
    // TODO: Refactor

    //var elementContent = element.innerHTML.replace(/\s/g, '');
    var elementContent = element.html().replace(/\s/g, '');
    //var elementLength = element.innerHTML.length; // should always be 5
    var elementLength = element.html().length; // should always be 5
    var elementWidth = element.outerWidth();

    return elementWidth / elementLength;
  }


  function generateHeadlines(fontSize, numberHeadlines) {
    // TODO: Verify variables
    // TODO: Refactor
    // TODO: Documentation

    var goldenRatio = 1.62;
    var typographicScale = [6,7,8,9,10,11,12,14,16,18,21,24,36,48,60];

    var exactH1Size = fontSize * goldenRatio;
    console.log('Exact Size: ' + exactH1Size); // DEBUG

    var h1Pos = getClosestValuePositionFromArray(exactH1Size, typographicScale);
    var h2Pos = h1Pos - 1;
    var h3Pos = h1Pos - 2;

    console.log('H1: ' + typographicScale[h1Pos]);
    console.log('H2: ' + typographicScale[h2Pos]);
    console.log('H3: ' + typographicScale[h3Pos]);

    var h1 = {size: typographicScale[h1Pos] + 'px'}
    var h2 = {size: typographicScale[h2Pos] + 'px'}
    var h3 = {size: typographicScale[h3Pos] + 'px'}

    return {h1: h1, h2: h2, h3: h3}
  }


  function getClosestValuePositionFromArray(exactValue, array) {
    // TODO: Verify variables
    // TODO: Refactor
    // TODO: Documentation

    for (var i = 0; i < array.length; i++) {
      console.log('Current position: ' + array[i]);

      if(array[i] > exactValue) {
        var upper = array[i];
        var lower = array[i - 1];

        var upperDiff = upper - exactValue;
        var lowerDiff = exactValue - lowerDiff;

        if(upperDiff > lowerDiff) {
          console.log('Closest Value: ' + lower);
          return i - 1;
        } else {
          console.log('Closest Value: ' + upper);
          return i;
        }
      }
    }

    return null;
  }


  function styleText(fontSize, lineHeight, contentWidth, headlines) {
    // TODO: Verify variables
    // TODO: Refactor
    // TODO: Documentation

    var textDiv = document.getElementById('styled-text');
    textDiv.style.fontSize = fontSize + 'px';
    textDiv.style.lineHeight = lineHeight + 'px';
    textDiv.style.maxWidth = contentWidth + 'px';

    var ps = textDiv.getElementsByTagName('p');

    for (var i = 0; i < ps.length; i++) {
      ps[i].style.marginBottom = (lineHeight / 2) + 'px';
      ps[i].style.marginTop = (lineHeight / 2) + 'px';
    }

    var h1 = textDiv.getElementsByTagName('h1')[0];
    var h2 = textDiv.getElementsByTagName('h2')[0];
    var h3 = textDiv.getElementsByTagName('h3')[0];

    h1.style.fontSize = headlines.h1.size;
    h1.style.marginTop = (lineHeight * 2.5) + 'px';
    h1.style.marginBottom = (lineHeight* 0.5) + 'px';

    h2.style.fontSize = headlines.h2.size;
    h2.style.marginTop = (lineHeight * 2.5) + 'px';
    h2.style.marginBottom = (lineHeight* 0.5) + 'px';

    h3.style.fontSize = headlines.h3.size;
    h3.style.marginTop = (lineHeight * 1.5) + 'px';
    h3.style.marginBottom = (lineHeight* 0.5) + 'px';

  }

})
