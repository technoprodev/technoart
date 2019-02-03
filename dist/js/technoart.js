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

  /**
   * Technoart v0.0.9 (https://technoartcss.com)
   * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
   * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
   */
  var footerFixed = function () {
    var Constructor = function Constructor() {
      /* jQuery('.body').outerHeight('auto')
      jQuery('.page-wrapper .footer').removeClass('footer-fixed')
      const wrapperHeighori = jQuery('.wrapper').outerHeight() || jQuery('.wrapper-boxed').outerHeight()
      if (wrapperHeighori <= jQuery(window).outerHeight()) {
        jQuery('.page-wrapper .footer').addClass('footer-fixed')
        const headerHeight = jQuery('.header').outerHeight() || 0
        const footerHeight = jQuery('.wrapper > .footer').outerHeight() || jQuery('.wrapper-boxed > .footer').outerHeight() || 0
        const bodyHeightFix = jQuery(window).outerHeight() - (headerHeight + footerHeight)
        jQuery('.body').outerHeight(bodyHeightFix)
      }*/
      var wrapper = document.getElementsByClassName('wrapper') || document.getElementsByClassName('wrapper-boxed');
      wrapper = wrapper ? wrapper[0] : false;
      var body = document.getElementsByClassName('body');
      body = body ? body[0] : false;
      var header = document.getElementsByClassName('header');
      header = header ? header[0] : false;
      var footerInPageWrapper = document.querySelectorAll('.page-wrapper > .footer');
      footerInPageWrapper = footerInPageWrapper ? footerInPageWrapper[0] : false;
      var footerInWrapper = document.querySelectorAll('.wrapper > .footer') || document.querySelectorAll('.wrapper-boxed > .footer');
      footerInWrapper = footerInWrapper ? footerInWrapper[0] : false;

      if (!wrapper || !body) {
        return;
      }

      body.style.height = 'auto';
      var footerFixedClass = 'footer-fixed';

      if (footerInPageWrapper && footerInPageWrapper.classList) {
        footerInPageWrapper.classList.remove(footerFixedClass);
      } else if (footerInPageWrapper) {
        footerInPageWrapper.className = footerInPageWrapper.className.replace(new RegExp('(^|\\b)' + footerFixedClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); // eslint-disable-line prefer-template
      }

      var wrapperHeight = wrapper.offsetHeight;
      var windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;

      if (wrapperHeight <= windowHeight) {
        if (footerInPageWrapper && footerInPageWrapper.classList) {
          footerInPageWrapper.classList.add(footerFixedClass);
        } else if (footerInPageWrapper) {
          footerInPageWrapper.className += " " + footerFixedClass;
        }

        var headerHeight = header.offsetHeight || 0;
        var footerHeight = footerInWrapper ? footerInWrapper.offsetHeight : 0;
        var bodyHeightFix = windowHeight - (headerHeight + footerHeight);
        body.style.height = bodyHeightFix + "px";
      }
    };

    Constructor(); // jQuery(window).bind('resize', Constructor)

    window.addEventListener('resize', function () {
      Constructor();
    });
    return Constructor;
  }();

  /**
   * Technoart v0.0.9 (https://technoartcss.com)
   * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
   * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
   */

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
          element.classList.toggle('sidebar-hide-left-default');
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

  /**
   * Technoart v0.0.9 (https://technoartcss.com)
   * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
   * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
   */

  var technoart = {
    backToTop: backToTop,
    footerFixed: footerFixed,
    fixedOnScroll: fixedOnScroll,
    menuY: menuY,
    toggle: toggle
  };

  return technoart;

})));
//# sourceMappingURL=technoart.js.map
