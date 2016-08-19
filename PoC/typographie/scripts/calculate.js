function calc() {
  var textSize = document.getElementById('font-size').value;
  var lineHeight = Math.round(textSize * 1.4);

  console.log('Text Size: ' + textSize);
  console.log('Line Height: ' + lineHeight);

  // Experimantal

  var ws = document.getElementById('ws');
  var is = document.getElementById('is');

  var wCharWidth = getCharWidth(adjustElementWidth(ws));
  var iCharWidth = getCharWidth(adjustElementWidth(is));

  var averageWidth = (wCharWidth + iCharWidth) / 2;
  console.log(averageWidth);

  var optimalContentWidth = averageWidth * 90;
  console.log(optimalContentWidth);
}


/**
 *  Fills an Element with Characters so that the Element is as close as possible
 *  to a width of 300px.
 */
function adjustElementWidth(element) {
  var elementContent = element.innerHTML.replace(/\s/g, '');

  console.log(elementContent);
  console.log('Width of Element at start: ' + element.offsetWidth);
  console.log('Content length at start: ' + elementContent.length);

  // Calculate width of one character
  var singleCharWidth = getCharWidth(element);
  console.log('Width of a single character: ' + singleCharWidth);
  var numChars = Math.floor((300 - (300 % singleCharWidth)) / singleCharWidth);
  console.log(numChars);

  var newContent = elementContent.substring(0, numChars);
  console.log(newContent);
  console.log('Measured length of new Content: ' + newContent.length);

  element.innerHTML = newContent;
  console.log(element.offsetWidth);

  return element;
}


/**
 *  Calculates the average width of a single character in the given element.
 */
function getCharWidth(element) {
  var elementContent = element.innerHTML.replace(/\s/g, '');
  var elementLength = element.innerHTML.length; // should always be 5
  var elementWidth = element.offsetWidth;

  return elementWidth / elementLength;
}
