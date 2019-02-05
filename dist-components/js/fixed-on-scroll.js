/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
var fixedOnScroll = function () {
  var Constructor =
  /*#__PURE__*/
  function () {
    function Constructor(element, addedClasses) {
      if (addedClasses === void 0) {
        addedClasses = '';
      }

      // const position = element.offsetTop
      var position = function (element) {
        element = element.getBoundingClientRect();
        return element.top + window.scrollY;
      }(element);

      var width = element.offsetWidth; // console.log(width) // eslint-disable-line no-console

      window.addEventListener('resize', function () {
        var _element$classList;

        var addition = addedClasses ? addedClasses.split(' ') : [];
        element.classList.remove('fixed-attached');

        (_element$classList = element.classList).remove.apply(_element$classList, addition);

        element.style.width = null;

        Constructor._toggle(element, addedClasses, position, element.offsetWidth);
      });
      window.addEventListener('scroll', function () {
        Constructor._toggle(element, addedClasses, position, width);
      });

      Constructor._toggle(element, addedClasses, position, width);
    }

    Constructor._toggle = function _toggle(element, addedClasses, position, width) {
      var addition = addedClasses ? addedClasses.split(' ') : [];

      if (window.pageYOffset > position) {
        var _element$classList2;

        element.classList.add('fixed-attached');

        (_element$classList2 = element.classList).add.apply(_element$classList2, addition);

        element.style.width = width + "px";
      } else {
        var _element$classList3;

        element.classList.remove('fixed-attached');

        (_element$classList3 = element.classList).remove.apply(_element$classList3, addition);

        element.style.width = null;
      }
    };

    return Constructor;
  }();

  var elements = document.querySelectorAll('[technoart-fixedonscroll]');
  var elementsLength = elements.length;

  for (var i = 0; i < elementsLength; i++) {
    Constructor(elements[i], elements[i].getAttribute('technoart-fixedonscroll'));
  }

  return Constructor;
}();
//# sourceMappingURL=fixed-on-scroll.js.map