$(function () {

  var setStyles = function () {
    var styles = '.purplecoat { display: none; position: absolute; padding: 5px; box-sizing: border-box; background-color: rgba(142, 68, 173, 0.8); color: #FFF; text-align: center; font-weight: bold; overflow: hidden; } .purplecoat-inner { display: table; width: 100%; height: 100%; } .purplecoat-inner-text { display: table-cell; vertical-align: middle;';

    var $style = $('<style/>');
    $style.html(styles);
    $('head').prepend($style);
  };

  setStyles();

  //$purplecoatTriggerをクリックしたら
  $('[data-purplecoat-toggle]').on('click', function () {

      //クリックしたdata-purplecoat-toggleの中身を取得し､data-purplecoatにトリガーのdataを代入する
      var purplecoatToggleData = $(this).attr('data-purplecoat-toggle');

      //クリックしたトリガーのdata-purplecoat-colorを取得する
      var purplecoatColorData = $(this).attr('data-purplecoat-color');

      //$purplecoatが表示されていたら､フェードアウトさせ､
      //表示されていなかったらフェードインさせる
      if ($("[data-purplecoat-for=" + purplecoatToggleData + "]:visible").size() > 0) {
        $("[data-purplecoat-for=" + purplecoatToggleData + "]:visible").fadeOut();
      } else if ($("[data-purplecoat-for=" + purplecoatToggleData + "]:hidden").size() > 0) {
        $("[data-purplecoat-for=" + purplecoatToggleData + "]:hidden").fadeIn();
      } else {
        //$purplecoatのターゲットそれぞれで行うよ
        $("[data-purplecoat=" + purplecoatToggleData + "]").each(function () {
          var $myself = $(this);

          //$purplecoatの生成(カラーが設定されている場合は､カラー変更)
          var $purplecoat = $('<div/>');
          $purplecoat.addClass('purplecoat');
          if (purplecoatColorData) {
            $purplecoat.css('background-color', purplecoatColorData);
          }
          $('body').append($purplecoat);

          var $purplecoatInner = $('<div/>');
          $purplecoatInner.addClass('purplecoat-inner');
          $purplecoat.append($purplecoatInner);

          var $purplecoatInnerText = $('<div/>');
          $purplecoatInnerText.addClass('purplecoat-inner-text');
          $purplecoatInner.append($purplecoatInnerText);

          //$purplecoatのlabelに記載されているdataを抽出し､$purplecoatに書き出す
          var purplecoatText = $myself.attr('data-purplecoat-label');
          $purplecoatInnerText.html(purplecoatText);

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
