function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
var fixedOnScroll = function () {
  var Constructor =
  /*#__PURE__*/
  function () {
    function Constructor(selector, addedClass) {
      if (addedClass === void 0) {
        addedClass = '';
      }

      var elements = document.querySelectorAll(selector);
      var elementsLength = elements.length;

      var _loop = function _loop(i) {
        var element = elements[i]; // const position = element.offsetTop

        var position = function (element) {
          element = element.getBoundingClientRect();
          return element.top + window.scrollY;
        }(element);

        var width = element.offsetWidth; // console.log(width) // eslint-disable-line no-console

        window.addEventListener('resize', function () {
          self.toggle(element, position, element.offsetWidth, addedClass);
        });

        if (element.getAttribute('data-technoart-fixedonscroll') !== 'active') {
          element.setAttribute('data-technoart-fixedonscroll', 'active');
          window.addEventListener('scroll', function () {
            self.toggle(element, position, width, addedClass);
          });
          self.toggle(element, position, width, addedClass);
        }
      };

      for (var i = 0; i < elementsLength; i++) {
        _loop(i);
      }
    }

    Constructor._toggle = function _toggle(element, position, width, addedClass) {
      var addition = addedClass ? addedClass.split(' ') : [];

      if (window.pageYOffset > position) {
        var _element$classList;

        element.classList.add('fixed-attached');

        (_element$classList = element.classList).add.apply(_element$classList, addition);

        element.style.width = width + "px";
      } else {
        var _element$classList2;

        element.classList.remove('fixed-attached');

        (_element$classList2 = element.classList).remove.apply(_element$classList2, addition);

        element.style.width = null;
      }
    };

    return Constructor;
  }();

  return Constructor;
}();

var footerFixed = function () {
  var Constructor = function Constructor() {
    jQuery('.body').outerHeight('auto');
    jQuery('.page-wrapper .footer').removeClass('footer-fixed');
    var wrapperHeight = jQuery('.wrapper').outerHeight() || jQuery('.wrapper-boxed').outerHeight();

    if (wrapperHeight <= jQuery(window).outerHeight()) {
      jQuery('.page-wrapper .footer').addClass('footer-fixed');
      var headerHeight = jQuery('.header').outerHeight() || 0;
      var footerHeight = jQuery('.wrapper > .footer').outerHeight() || jQuery('.wrapper-boxed > .footer').outerHeight() || 0;
      var bodyHeightFix = jQuery(window).outerHeight() - (headerHeight + footerHeight);
      jQuery('.body').outerHeight(bodyHeightFix);
    }
  };

  Constructor();
  jQuery(window).bind('resize', Constructor);
  return Constructor;
}();

var menuY = function () {
  var Constructor =
  /*#__PURE__*/
  function () {
    function Constructor(element, action, config) {
      if (config === void 0) {
        config = {};
      }

      var defaultConfig = {
        multiple: false
      };
      config = _objectSpread({}, defaultConfig, config);

      if (element.getAttribute('data-technoart-menuy') === 'active') {
        if (action === 'toggle') {
          Constructor.toggle(config);
        }

        return;
      } // Let's go


      Constructor.init(element, action, config);
    }

    Constructor.init = function init(element, action, config) {
      Constructor.addEventForChild(element, 'click', 'a', function (childElement, e) {
        var $menuY = jQuery(element);
        var $active = $menuY.find('.active > ul');
        var $activeParents = $menuY.find('.active').parentsUntil($menuY, 'ul');
        var $links = jQuery(childElement);
        var $next = $links.next();
        var $isActive = $links.parent().hasClass('active') || $next.find('.active').length > 0;
        var $parents = $links.parentsUntil($menuY, 'ul');
        var tigaratus = 300;
        $next.slideToggle(tigaratus, function () {
          $links.parent().toggleClass('open');
        });

        if (config.multiple && !$isActive && $next.length > 0) {
          $menuY.find('ul').not($next).not($active).not($activeParents).not($parents).slideUp(tigaratus).parent().removeClass('open');
        }

        if ($next.length > 0) {
          e.preventDefault();
        }
      });
      element.setAttribute('data-technoart-menuy', 'active');

      if (action === 'noName') {
        Constructor.noName(config);
      }
    };

    Constructor.noName = function noName() {
      var element = document.querySelector('.has-sidebar-left');

      if (element) {
        element.classList.toggle('sidebar-left-hide-default');
      }
    };

    Constructor.addEventForChild = function addEventForChild(parent, eventName, childSelector, callback) {
      parent.addEventListener(eventName, function (event) {
        var clickedElement = event.target;
        var matchingChild = clickedElement.closest(childSelector);
        callback(matchingChild, event);
      });
    };

    return Constructor;
  }();

  var element = document.querySelector('.menu-y');

  if (element) {
    Constructor(element);
  }

  return Constructor;
}();

var toggleSidebarLeft = function () {
  var Constructor =
  /*#__PURE__*/
  function () {
    function Constructor(element, action, config) {
      if (config === void 0) {
        config = {};
      }

      var defaultConfig = {};
      config = _objectSpread({}, defaultConfig, config);

      if (element.getAttribute('data-technoart-togglesidebarleft') === 'active') {
        if (action === 'toggle') {
          Constructor.toggle(config);
        }

        return;
      } // Let's go


      Constructor.init(element, action, config);
    }

    Constructor.init = function init(element, action, config) {
      element.addEventListener('click', function (e) {
        Constructor.toggle(config);
        e.preventDefault();
      });
      element.setAttribute('data-technoart-togglesidebarleft', 'active');

      if (action === 'toggle') {
        Constructor.toggle(config);
      }
    };

    Constructor.toggle = function toggle() {
      var element = document.querySelector('.has-sidebar-left');

      if (element) {
        element.classList.toggle('sidebar-left-hide-default');
      }
    };

    return Constructor;
  }();

  var elements = document.querySelectorAll('[data-toggle="sidebar-left"]');
  var elementsLength = elements.length;

  for (var i = 0; i < elementsLength; i++) {
    if (elements[i]) {
      Constructor(elements[i]);
    }
  }

  return Constructor;
}();
//# sourceMappingURL=layout.js.map