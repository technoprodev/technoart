function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
var backToTop = function () {
  var Constructor =
  /*#__PURE__*/
  function () {
    function Constructor(element, action, config) {
      if (config === void 0) {
        config = {};
      }

      var defaultConfig = {
        minToScroll: 20 // in px

      };
      config = _objectSpread({}, defaultConfig, config);

      if (element.getAttribute('data-technoart-backtotop') === 'active') {
        if (action === 'scrollTop') {
          Constructor.scrollTop();
        }

        return;
      } // Let's go


      Constructor.init(element, action, config);
    }

    Constructor.init = function init(element, action, config) {
      function hideOrShow() {
        if (document.body.scrollTop > config.minToScroll || document.documentElement.scrollTop > config.minToScroll) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      }

      hideOrShow();
      window.addEventListener('scroll', hideOrShow);
      element.addEventListener('click', function () {
        Constructor.scrollTop();
      });
      element.setAttribute('data-technoart-backtotop', 'active');

      if (action === 'scrollTop') {
        Constructor.scrollTop();
      }
    };

    Constructor.scrollTop = function scrollTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    return Constructor;
  }();

  var elements = document.querySelectorAll('.back-to-top');
  var elementsLength = elements.length;

  if (elementsLength > 0) {
    for (var i = 0; i < elementsLength; i++) {
      Constructor(elements[i]);
    }
  }

  return Constructor;
}();
//# sourceMappingURL=back-to-top.js.map