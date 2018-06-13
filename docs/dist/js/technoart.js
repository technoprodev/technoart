/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.technoart = factory(global.jQuery));
}(this, (function (jQuery) { 'use strict';

  jQuery = jQuery && jQuery.hasOwnProperty('default') ? jQuery['default'] : jQuery;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * Technoart v0.0.9 (https://technoartcss.com)
   * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
   * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
   */

  var fixedOnScroll = function () {
    var Constructor =
    /*#__PURE__*/
    function () {
      function Constructor(element, action) {
        Constructor.init(element, action);
      }

      Constructor.init = function init(element, action) {
        // const fixed = element.offsetTop
        var fixed = function (el) {
          el = el.getBoundingClientRect();
          return el.top + window.scrollY;
        }(element);

        var width = element.offsetWidth;

        if (element.getAttribute('data-technoart-fixedonscroll') !== 'active') {
          element.setAttribute('data-technoart-fixedonscroll', 'active');
          window.addEventListener('scroll', function () {
            Constructor.toggle(element, fixed, width);
          });
          Constructor.toggle(element, fixed, width);
        }

        if (action === 'toggle') {
          Constructor.toggle(element, fixed, width);
        }
      };

      Constructor.toggle = function toggle(element, fixed, width) {
        if (window.pageYOffset >= fixed) {
          element.classList.add('fixed-attached');
          element.style.width = width + "px";
        } else {
          element.classList.remove('fixed-attached');
          element.style.width = null;
        }
      };

      return Constructor;
    }();

    var elements = document.querySelectorAll('.fixed-on-scroll');
    var elementsLength = elements.length;

    for (var i = 0; i < elementsLength; i++) {
      if (elements[i]) {
        Constructor(elements[i]);
      }
    }

    return Constructor;
  }();

  var footerFixed = function () {
    var Constructor =
    /*#__PURE__*/
    function () {
      function Constructor() {
        // Let's go
        Constructor.init();
      }

      Constructor.init = function init() {
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

      return Constructor;
    }();

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

  /**
   * Technoart v0.0.9 (https://technoartcss.com)
   * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
   * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
   */

  var technoart = {
    backToTop: backToTop,
    fixedOnScroll: fixedOnScroll,
    footerFixed: footerFixed,
    menuY: menuY,
    toggleSidebarLeft: toggleSidebarLeft
  };

  return technoart;

})));
//# sourceMappingURL=technoart.js.map
