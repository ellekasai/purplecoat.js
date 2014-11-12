$(function ($) {

  var styles = '.purplecoat { display: none; position: absolute; padding: 5px; box-sizing: border-box; background-color: rgba(142, 68, 173, 0.9); color: #FFF; text-align: center; font-weight: bold; overflow: hidden; z-index: 9999; } .purplecoat-inner { display: table; width: 100%; height: 100%; } .purplecoat-inner-text { display: table-cell; vertical-align: middle;}';

  var $style = $('<style/>');
  $style.html(styles);
  $('head').prepend($style);

  var createOverlay = function(element, elementData, label, color){
    var $purplecoat = $('<div class="purplecoat"></div>');
    var $purplecoatInner = $('<div class="purplecoat-inner"></div>');
    var $purplecoatInnerText = $('<div class="purplecoat-inner-text"></div>');

    $('body').append($purplecoat);
    $purplecoat.append($purplecoatInner);
    $purplecoatInnerText.html(label);
    $purplecoatInner.append($purplecoatInnerText);

    if (color) {
      $purplecoat.css('background-color', color);
    }

    $purplecoat
      .attr('data-purplecoat-for', elementData)
      .css({
        'top': element.offset().top,
        'left': element.offset().left,
        'width': element.width(),
        'height': element.height() })
      .fadeIn();
  }

  var purplecoat = function(target){
    var purplecoatToggleData = target.data('purplecoat-toggle');
    var $purplecoatVisible = $("[data-purplecoat-for=" + purplecoatToggleData + "]:visible");
    var $purplecoatHidden = $("[data-purplecoat-for=" + purplecoatToggleData + "]:hidden");

    if ($purplecoatVisible.size()) {
      $purplecoatVisible.fadeOut();
    } else if ($purplecoatHidden.size()) {
      $purplecoatHidden.fadeIn();
    } else {

      var purplecoatColorData = target.data('purplecoat-color');

      $("[data-purplecoat=" + purplecoatToggleData + "]").each(function () {
        var $myself = $(this);

        if ($myself.is(":hidden")) {
          return;
        }

        createOverlay($myself, purplecoatToggleData, $myself.data('purplecoat-label'), purplecoatColorData);

      });
    }

  }

  $.fn.purplecoat = function(options){
    var self = this;
    var options = typeof options === "boolean" ? {hide: true, data: self.selector} : $.extend({
      color: "#EF0038",
      label: "PurpleCoat",
      data: self.selector,
      hide: false
    }, options);

    if(options.hide){
      $("[data-purplecoat-for=" + options.data + "]:visible").fadeOut({
        complete: function(){
          $(this).remove();
        }
      });
      return this;
    }

    return this.each(function(){
      var $myself = $(this);

      if ($myself.is(":hidden")) {
        return;
      }

      createOverlay($myself, options.data, options.label, options.color);

    });
  }

  $('[data-purplecoat-toggle]').on('click', function () {
    purplecoat($(this));
  });
})(jQuery);
