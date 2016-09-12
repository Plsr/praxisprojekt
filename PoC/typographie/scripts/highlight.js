$(document).ready(function () {

  /**
   * OnClick Listener for the #styled-text element.
   * Adds highlighting and margin highlighting for click target.
   * Also removes all other other highlights from earlier click events
   * on this element.
   */
  $("#styled-text").children().click(function(event) {

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
  });

  /**
   * OnClick listener for padding highlights.
   * Removes all highlighting (padding and element) on clickpadding
   */
  $("#styled-text").on('click', ".highlight-padding", function(event) {
    console.log("YOOOOOO");
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
})
