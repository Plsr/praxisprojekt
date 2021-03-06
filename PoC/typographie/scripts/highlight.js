"use strict";

$(document).ready(function () {

  /**
   * OnClick Listener for the #styled-text element.
   * Adds highlighting and margin highlighting for click target.
   * Also removes all other other highlights from earlier click events
   * on this element.
   */
  $("#styled-text").children().click(function (event) {

    // Get target
    var target = event.target;

    // Remove old highligts from other elements
    removeOldHighlights(target);

    // Add highlight class to target element
    $(target).addClass("highlight");

    // If the highlight just got set, also highlight
    // the margins of the element
    if ($(target).hasClass("highlight")) {
      $(target).before("<div class='highlight-padding'></div>");
      $(".highlight-padding").css(computeStyles(target));
    }

    displayControls(target);
  });

  /**
   * OnClick listener for padding highlights.
   * Removes all highlighting (padding and element) on clickpadding
   */
  $("#styled-text").on('click', ".highlight-padding", function (event) {
    console.log("YOOOOO");
    $(event.target).siblings().removeClass("highlight");
    $(event.target).remove();
  });

  /**
   * Computes the styles for an additional element highlighting the margins of
   * an base element.
   *
   * @param  {object} target element on which base the style shall be caomputed
   * @return {object}        object containing the computed styles
   *                         ready for use in .css()
   */
  function computeStyles(target) {
    var height = $(target).height();
    var width = $(target).width();
    var paddingTop = $(target).css("padding-top");
    var paddingBottom = $(target).css("padding-bottom");

    var styles = {
      "height": height,
      "width": width,
      "border-top": "solid " + paddingTop + " orange",
      "border-bottom": "solid " + paddingBottom + " orange"
    };

    return styles;
  }

  /**
   * Removes the highlight class and elment that highlights the margins
   * from all silblings of the clicked element
   *
   * @param  {object} target target of click event
   */
  function removeOldHighlights(target) {
    $(target).siblings().removeClass("highlight");
    $(".highlight-padding").remove();
  }

  var displayControls = function displayControls(target) {

    // Debug
    // TODO: Remove
    var position = $(target).position();
    console.log("Controls should be spawned, target is " + target);
    console.log("Target position: " + position.left + " , " + position.top);

    var rightCenterPosition = calculateRightCenterPosition(target);
  };

  var calculateRightCenterPosition = function calculateRightCenterPosition(target) {
    var targetPosition = $(target).position();
    var targetWidth = $(target).outerWidth();
    var targetHeight = $(target).outerHeight();

    // Debug
    // TODO: Remove
    console.log("Target width: " + targetWidth);
    console.log("Target height " + targetHeight);

    var rightCenterPosition = {
      "left": targetPosition.left + targetWidth,
      "top": targetPosition.top + targetHeight / 2
    };

    // Debug
    // TODO: Remove
    console.log(rightCenterPosition.left);
    console.log(rightCenterPosition.top);

    return rightCenterPosition;
  };
});