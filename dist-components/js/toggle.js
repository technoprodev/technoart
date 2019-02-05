/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
var toggle = function () {
  var Constructor =
  /*#__PURE__*/
  function () {
    function Constructor(element, targetSelector, addedClasses) {
      if (addedClasses === void 0) {
        addedClasses = '';
      }

      element.addEventListener('click', function (e) {
        Constructor._toggle(targetSelector, addedClasses);

        e.preventDefault();
      });
    }

    Constructor._toggle = function _toggle(targetSelector, addedClasses) {
      var targets = document.querySelectorAll(targetSelector);
      var targetsLength = targets.length;

      for (var i = 0; i < targetsLength; i++) {
        targets[i].classList.toggle(addedClasses);
      }
    };

    return Constructor;
  }();

  var elements = document.querySelectorAll('[technoart-toggle]');
  var elementsLength = elements.length;

  for (var i = 0; i < elementsLength; i++) {
    Constructor(elements[i], elements[i].getAttribute('technoart-toggle'), elements[i].getAttribute('technoart-toggleclasses'));
  }

  return Constructor;
}();
//# sourceMappingURL=toggle.js.map