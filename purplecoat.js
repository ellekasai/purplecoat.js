(function ($) {

  var f = function(purplecoatToggleData, purplecoatColorData, target) {
    var $purplecoatVisible = $("[data-purplecoat-for=" + purplecoatToggleData + "]:visible");
    var $purplecoatHidden = $("[data-purplecoat-for=" + purplecoatToggleData + "]:hidden");

    if ($purplecoatVisible.length()) {
      $purplecoatVisible.fadeOut();
    } else if ($purplecoatHidden.length()) {
      $purplecoatHidden.fadeIn();
    } else {
      target.each(function () {
        var $myself = $(this);

        if ($myself.is(":hidden")) {
          return;
        }

        var $purplecoat = $('<div class="purplecoat"></div>');
        $('body').append($purplecoat);

        var $purplecoatInner = $('<div class="purplecoat-inner"></div>');
        $purplecoat.append($purplecoatInner);

        var $purplecoatInnerText = $('<div class="purplecoat-inner-text"></div>');
        $purplecoatInnerText.html($myself.data('purplecoat-label'));
        $purplecoatInner.append($purplecoatInnerText);

        if ($myself.data('purplecoat-color')) {
          purplecoatColorData = $myself.data('purplecoat-color');
        }

        if (purplecoatColorData) {
          $purplecoat.css('background-color', purplecoatColorData);
        }

        $purplecoat
        .attr('data-purplecoat-for', purplecoatToggleData)
        .css({
          'top': $myself.offset().top,
          'left': $myself.offset().left,
          'width': $myself.outerWidth(),
          'height': $myself.outerHeight() })
          .fadeIn();

      });
    }
  }

  $.fn.purplecoat = function() {
    var purplecoatToggleData = this.data("purplecoat");
    var purplecoatColorData = this.data("purplecoat-color");
    var target = this;

    f(purplecoatToggleData,
      purplecoatColorData,
      target);
  }

  $(function () {

    var styles = '.purplecoat { display: none; position: absolute; padding: 5px; box-sizing: border-box; background-color: rgba(142, 68, 173, 0.9); color: #FFF; text-align: center; font-weight: bold; overflow: hidden; z-index: 9999; } .purplecoat-inner { display: table; width: 100%; height: 100%; } .purplecoat-inner-text { display: table-cell; vertical-align: middle;}';

    var $style = $('<style/>');
    $style.html(styles);
    $('head').prepend($style);

    $('[data-purplecoat-toggle]').on('click', function () {
      var purplecoatToggleData = $(this).data('purplecoat-toggle');
      var purplecoatColorData = $(this).data('purplecoat-color');
      var target = $("[data-purplecoat=" + purplecoatToggleData + "]");

      f(purplecoatToggleData,
        purplecoatColorData,
        target);
    });
  });
})(jQuery);
