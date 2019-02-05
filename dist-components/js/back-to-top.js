/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
var backToTop = function () {
  var Constructor =
  /*#__PURE__*/
  function () {
    function Constructor(element) {
      var minToScroll = 20;

      function hideOrShow() {
        if (document.body.scrollTop > minToScroll || document.documentElement.scrollTop > minToScroll) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      }

      hideOrShow();
      window.addEventListener('scroll', hideOrShow);
      element.addEventListener('click', function () {
        Constructor._scrollTop();
      });
    }

    Constructor._scrollTop = function _scrollTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    return Constructor;
  }();

  var elements = document.querySelectorAll('[technoart-backtotop]');
  var elementsLength = elements.length;

  if (elementsLength > 0) {
    for (var i = 0; i < elementsLength; i++) {
      Constructor(elements[i]);
    }
  }

  return Constructor;
}();
//# sourceMappingURL=back-to-top.js.map