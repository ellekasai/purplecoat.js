(function( $ ) {

  $.fn.purplecoat = function(options){

    var toggleName;

    // Default options, mostly just CSS
    var settings = $.extend({
      container: {
        display        : 'none',
        position       : 'absolute',
        padding        : '5px',
        boxSizing      : 'border-box',
        backgroundColor: 'rgba(142, 68, 173, 0.9)',
        color          : '#FFF',
        textAlign      : 'center',
        fontWeight     : 'bold',
        overflow       : 'hidden',
        zIndex         : '9999'
      },
      innerContainer : {
        display: 'table',
        width  : '100%',
        height : '100%'
      },
      textContainer : {
        display      : 'table-cell',
        verticalAlign: 'middle'
      },
      fade: {
        duration: 400, 
        easing  : 'swing'
        // onComplete: function(){}
      }
    }, options );

    // For each element to toggle we prepare some stuff
    var createToggle = function(index, element){

      // avoid the double fire, from the hidden toggle element
      if ($(this).is(":hidden"))
        return;

      var backgroundColor = $(element).data('purplecoat-color');
      var label           = $(element).data('purplecoat-label');

      var container      = $('<div class="purplecoat"></div>');
      var innerContainer = $('<div class="purplecoat-inner"></div>');
      var textContainer  = $('<div class="purplecoat-inner-text"></div>');

      // build html & apply css
      $('body').append(
        container.css(settings.container).append(
          innerContainer.css(settings.innerContainer).append(
            textContainer.css(settings.textContainer).text(
              label
            )
          )
        )
      );

      // store a reference to which overlay the container belongs to
      $(element).data('purplecoat-container', container);

      // set the containers color and position
      $(container)
        .css({
          backgroundColor: settings.backgroundColor || backgroundColor,
          top            : $(this).offset().top,
          left           : $(this).offset().left,
          width          : $(this).width(),
          height         : $(this).height(),
        })
        .attr('data-purplecoat-for', toggleName);

    } // end of createToggle

    // incase the dom attributes are updated
    var updateToggle = function(index, element){

      // avoid the double fire, from the hidden toggle element
      if ($(this).is(":hidden"))
        return;

      var backgroundColor = $(element).attr('data-purplecoat-color');
      var label           = $(element).attr('data-purplecoat-label');
      var container       = $(element).data('purplecoat-container');

      $(container)
        .css({
          backgroundColor: settings.backgroundColor || backgroundColor,
        })
        .find('.purplecoat-inner-text').text(label);

    } // end of updateToggle

    var toggle = function(index, element){

      // read from dom or use default/setting
      var duration  = $(element).attr('data-purplecoat-duration') || settings.fade.duration;
      var easing    = $(element).attr('data-purplecoat-easing')   || settings.fade.easing;
      var container = $(element).data('purplecoat-container');

      $(container).fadeToggle(parseInt(duration), easing, settings.fade.onComplete);

    } // end of toggle

    var clickToggle = function (event){

      // handle
      toggleName = $(this).data('purplecoat-toggle');

      // overlay doesn't exist, create it
      if(!$("[data-purplecoat-for=" + toggleName + "]").size()){
        $("[data-purplecoat=" + toggleName + "]").each(createToggle);
      }
      // update if data-attrbutes changed
      $("[data-purplecoat=" + toggleName + "]").each(updateToggle);

      // toggle, update the ui, also onComplete can only be configured via initialization
      $("[data-purplecoat=" + toggleName + "]").each(toggle);

    } // end of clickToggle

    // purplecoat the element, remove the click event if we already bound to the element, and apply it freshly
    return this.unbind('click.purplecoatClick').bind('click.purplecoatClick', clickToggle);

  }; // end of $.fn.purplecoat

  // auto-initialization
  $('[data-purplecoat-toggle]').purplecoat();

}(jQuery));
