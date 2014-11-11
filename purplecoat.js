$(function () {

  var styles = '.purplecoat { display: none; position: absolute; padding: 5px; box-sizing: border-box; background-color: rgba(142, 68, 173, 0.9); color: #FFF; text-align: center; font-weight: bold; overflow: hidden; z-index: 9999; } .purplecoat-inner { display: table; width: 100%; height: 100%; } .purplecoat-inner-text { display: table-cell; vertical-align: middle;}';

  var $style = $('<style/>');
  $style.html(styles);
  $('head').prepend($style);
    
  $(window).resize(function() {
      $('.purplecoat').each(function() {
          $overlayedElement = $(this).data('overlayed-element');
          $(this).css({
              'top': $overlayedElement.offset().top,
              'left': $overlayedElement.offset().left,
              'width': $overlayedElement.width(),
              'height': $overlayedElement.height() 
          });
      });
  });
    

  $('[data-purplecoat-toggle]').on('click', function () {

      var purplecoatToggleData = $(this).data('purplecoat-toggle');
      var $purplecoatVisible = $("[data-purplecoat-for=" + purplecoatToggleData + "]:visible");
      var $purplecoatHidden = $("[data-purplecoat-for=" + purplecoatToggleData + "]:hidden");

      if ($purplecoatVisible.size()) {
        $purplecoatVisible.fadeOut();
      } else if ($purplecoatHidden.size()) {
        $purplecoatHidden.fadeIn();
      } else {

        var purplecoatColorData = $(this).data('purplecoat-color');

        $("[data-purplecoat=" + purplecoatToggleData + "]").each(function () {
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

          if (purplecoatColorData) {
            $purplecoat.css('background-color', purplecoatColorData);
          }
          $purplecoat.data('overlayed-element',$myself);
                    
          $purplecoat.click(function() {console.log($(this).data('overlayed-element'))})    
          $purplecoat
            .attr('data-purplecoat-for', purplecoatToggleData)
            .css({
              'top': $myself.offset().top,
              'left': $myself.offset().left,
              'width': $myself.width(),
              'height': $myself.height() })
            .fadeIn();

        });
      }
  });
});
