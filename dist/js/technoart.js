/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.technoart = factory());
}(this, (function () { 'use strict';

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
    var Constructor = function Constructor() {
      function toggleClass(el, className) {
        if (el.classList) {
          el.classList.toggle(className);
        } else {
          var classes = el.className.split(' ');
          var existingIndex = -1;

          for (var i = classes.length; i--;) {
            if (classes[i] === className) {
              existingIndex = i;
            }
          }

          if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
          } else {
            classes.push(className);
          }

          el.className = classes.join(' ');
        }
      }

      function removeClass(el, className) {
        el.className = el.className.split(' ').filter(function (cls) {
          var isRemove = className !== cls;
          return isRemove;
        }).join(' ');
      }

      function parentsUntil(el, parent) {
        // Element.matches() polyfill
        if (typeof Element.prototype.matches !== 'function') {
          Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s);
            var i = matches.length;

            while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty


            return i > -1;
          };
        }

        var htmlElement = el;
        var parentsUntil = [];
        var until = true;

        while (until) {
          htmlElement = htmlElement.parentNode;

          if (htmlElement.matches && !htmlElement.matches(parent)) {
            parentsUntil.push(htmlElement);
          } else {
            until = false;
          }
        }

        return parentsUntil;
      }

      var SlideToggler =
      /*#__PURE__*/
      function () {
        function SlideToggler(el1) {
          this.getHeight = this.getHeight.bind(this);
          this.toggle = this.toggle.bind(this);
          this.slideUp = this.slideUp.bind(this);
          this.slideDown = this.slideDown.bind(this);
          this.slide = this.slide.bind(this);
          this.el = el1;

          if (!this.el) {
            return;
          }

          window.addEventListener('resize', this.getHeight);
        }

        var _proto = SlideToggler.prototype;

        _proto.getHeight = function getHeight() {
          var clone = this.el.cloneNode(true);
          clone.style.cssText = 'visibility: hidden; display: block; margin: -999px 0';
          this.height = this.el.parentNode.appendChild(clone).clientHeight;
          this.el.parentNode.removeChild(clone);
          return this.height;
        };

        _proto.toggle = function toggle(time, onFinish) {
          this.getHeight();

          if (!time) {
            time = this.height / 3 + 150; // eslint-disable-line no-magic-numbers
          }

          var currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none');

          var _ref = currHeight > this.height / 2 ? [this.height, 0] : [0, this.height],
              start = _ref[0],
              end = _ref[1]; // eslint-disable-line no-magic-numbers


          return this.slide(start, end, time, onFinish);
        };

        _proto.slideUp = function slideUp(time, onFinish) {
          this.getHeight();

          if (!time) {
            time = this.height / 3 + 150; // eslint-disable-line no-magic-numbers
          }

          var currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none');
          return this.slide(currHeight, 0, time, onFinish);
        };

        _proto.slideDown = function slideDown(time, onFinish) {
          this.getHeight();

          if (!time) {
            time = this.height / 3 + 150; // eslint-disable-line no-magic-numbers
          }

          var currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none');
          return this.slide(currHeight, this.height, time, onFinish);
        };

        _proto.slide = function slide(start, end, time, onFinish) {
          var _this = this;

          if (start === end) {
            if (typeof onFinish === 'function') {
              onFinish();
            }

            return this;
          }

          var disp = end - start;
          var el = this.el;
          var init = new Date().getTime();
          this.el.classList[end === 0 ? 'remove' : 'add']('open');
          this.el.style.cssText = 'overflow: hidden; display: block;';
          init = new Date().getTime(); // const direction = start < end ? 'DOWN' : 'UP'

          var repeat = function repeat() {
            // eslint-disable-line consistent-return
            var instance = new Date().getTime() - init;
            var step = start + disp * instance / time;

            if (instance <= time) {
              el.style.height = step + "px"; // if Math.floor(step) in [start..end]
            } else {
              el.style.cssText = "display: " + (end === 0 ? 'none' : 'block');
            }

            var repeatLoop = requestAnimationFrame(repeat);
            var ref = Math.floor(step);

            if ([].indexOf.call(function () {
              var results = [];

              for (var i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--) {
                results.push(i);
              }

              return results;
            }.apply(_this), ref) < 0) {
              cancelAnimationFrame(repeatLoop);

              if (typeof onFinish === 'function') {
                onFinish();
              }

              return _this;
            }
          };

          return repeat();
        };

        return SlideToggler;
      }();

      var menuY = document.querySelector('.menu-y');

      if (menuY) {
        var uls = menuY.querySelectorAll('ul');
        Array.from(uls).forEach(function (ul) {
          ul.toggler = new SlideToggler(ul);
        });
        menuY.addEventListener('click', function (event) {
          var clickedElement = event.target;
          var link = clickedElement.closest('a');

          var next = link.nextElementSibling || function (el) {
            do {
              el = el.nextSibling;
            } while (el && el.nodeType !== 1);

            return el;
          }(link);

          var tigaratus = 300;
          next.toggler.toggle(tigaratus, function () {
            toggleClass(link.parentNode, 'open');
          });

          var isActive = next.querySelectorAll('.active').length > 0 || function (el, className) {
            if (el.classList) {
              el.classList.contains(className);
            } else {
              new RegExp("(^| )" + className + "( |$)", 'gi').test(el.className);
            }
          }(link.parentNode, 'active');

          var activeUls = Array.from(menuY.querySelectorAll('.active > ul'));
          var activeParents = Array.from(function () {
            var activeParents = [];
            var actives = menuY.querySelectorAll('.active');
            var activesLength = actives.length;

            if (activesLength > 0) {
              for (var i = 0; i < activesLength; i++) {
                var activeParent = parentsUntil(actives[i], '.menu-y', 'ul');
                var activeParentLength = activeParent.length;

                if (activeParentLength > 0) {
                  for (var j = 0; j < activeParentLength; j++) {
                    activeParents.push(activeParent[j]);
                  }
                }
              }
            }

            return activeParents;
          }());
          var parents = parentsUntil(link, '.menu-y', 'ul');

          if (!isActive && next) {
            Array.from(uls).filter(function (ul) {
              var isRemove = ul !== next && activeUls.indexOf(ul) === -1 && activeParents.indexOf(ul) === -1 && parents.indexOf(ul) === -1;
              return isRemove;
            }).forEach(function (ul) {
              ul.toggler.slideUp(tigaratus);
              removeClass(ul.parentNode, 'open');
            });
          }

          if (next) {
            event.preventDefault();
          }
        });
      }
    };

    Constructor();
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
