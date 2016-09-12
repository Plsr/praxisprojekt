$(document).ready(function () {

  /**
   * OnClick Listener for the #styled-text element.
   * Toogles highlighting and margin highlighting for click target.
   * Also removes all other other highlights from earlier click events
   * on this element.
   */
  $("#styled-text").children().click(function(event) {

    // Get target
    var target = event.target;

    // Remove old highligts from other elements
    removeOldHighlights();

    // Toggle highlight class on target element
    $(target).toggleClass("highlight");

    // If the highlight just got set, also highlight
    // the margins of the element
    if ($(target).hasClass("highlight")) {
      $(target).before("<div class='highlight-margin'></div>");
      $(".highlight-margin").css(computeStyles(target));
    }
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
    var marginTop = $(target).css("margin-top");
    var marginBottom = $(target).css("margin-bottom");

    var styles = {
      "height": height,
      "width": width,
      "border-top": "solid " + marginTop + " orange",
      "border-bottom": "solid " + marginBottom + " orange",
      "margin-top": "-" + marginTop
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
    $(".highlight-margin").remove();
  }
})
