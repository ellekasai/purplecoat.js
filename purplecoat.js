$(function () {
  var $purplecoatTrigger = $('[data-purplecoat-toggle]');

  //$purplecoatTriggerをクリックしたら
  $purplecoatTrigger.on('click', function() {

      //クリックしたdata-purplecoat-toggleの中身を取得し､data-purplecoatにトリガーのdataを代入する
      var purplecoatToggleData = $(this).attr('data-purplecoat-toggle');
      var $purplecoatTarget = $("[data-purplecoat=" + purplecoatToggleData + "]");

      //$purplecoatが表示されていたら､フェードアウトさせ､
      //表示されていなかったらフェードインさせる
      if ($("[data-purplecoat-for=" + purplecoatToggleData + "]:visible").size() > 0) {
        $("[data-purplecoat-for=" + purplecoatToggleData + "]:visible").fadeOut();
      } else if ($("[data-purplecoat-for=" + purplecoatToggleData + "]:hidden").size() > 0) {
        $("[data-purplecoat-for=" + purplecoatToggleData + "]:hidden").fadeIn();
      } else {
        //$purplecoatのターゲットそれぞれで行うよ
        $purplecoatTarget.each(function() {
          var $myself = $(this);

          //$purplecoatの生成
          var $purplecoat = $('<div/>');
          $purplecoat.addClass('purplecoat');
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

          //$purplecoatにdata-purplecoat-forという新しい属性をつくり､そこにトリガーのデータを保存する
          $purplecoat.attr('data-purplecoat-for', purplecoatToggleData);

          //$purplecoatのターゲットのwidthとheightを取得し､$purplecoatの大きさを決める
          var purplecoatTargetWidth = $myself.width();
          var purplecoatTargetHeight = $myself.height();
          $purplecoat.css({'width' : purplecoatTargetWidth, 'height' : purplecoatTargetHeight});

          //$purplecoatの位置を設定する
          var purplecoatTargetPosition = $myself.offset();
          var purplecoatPositionTop = purplecoatTargetPosition.top;
          var purplecoatPositionLeft = purplecoatTargetPosition.left;
          $purplecoat.css({'top' : purplecoatPositionTop, 'left' : purplecoatPositionLeft});

          //$purplecoatをフェードインさせる
          $purplecoat.fadeIn();
          });
      }
  });
});
