function calc() {
  var fontSize = document.getElementById('font-size').value;
  var lineHeight = Math.round(fontSize * 1.4);

  console.log('Text Size: ' + fontSize);
  console.log('Line Height: ' + lineHeight);

  // Experimantal

  var ws = document.getElementById('ws');
  var is = document.getElementById('is');

  var wCharWidth = getCharWidth(adjustElementWidth(ws, fontSize));
  var iCharWidth = getCharWidth(adjustElementWidth(is, fontSize));

  var averageWidth = (wCharWidth + iCharWidth) / 2;
  console.log(averageWidth);

  var optimalContentWidth = averageWidth * 90;
  console.log(optimalContentWidth);
}


/**
 *  Fills an Element with Characters so that the Element is as close as possible
 *  to a width of 300px.
 */
function adjustElementWidth(element, fontSize) {
  // TODO: Verify variables

  // Remove whitespace from text
  var elementContent = element.innerHTML.replace(/\s/g, '');

  // Set font size of text example according to what
  // the user defined
  element.style.fontSize = fontSize + "px";

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

  var elementContent = element.innerHTML.replace(/\s/g, '');
  var elementLength = element.innerHTML.length; // should always be 5
  var elementWidth = element.offsetWidth;

  return elementWidth / elementLength;
}
