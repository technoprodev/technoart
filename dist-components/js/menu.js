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
    /** Event Queue */


    var evQueue = {
      queue: [],
      isWorking: false,
      add: function add(fn, params, onFinish) {
        evQueue.queue.push([fn, params, onFinish]);
        evQueue.runQueue();
      },
      hasQueue: function hasQueue() {
        var isTrue = evQueue.queue.length > 0;
        return isTrue;
      },
      runQueue: function runQueue() {
        // console.log('RUN', !evQueue.isWorking, evQueue.queue)
        if (!evQueue.isWorking && evQueue.hasQueue()) {
          evQueue.isWorking = true;
          var _evQueue$queue$ = evQueue.queue[0],
              fn = _evQueue$queue$[0],
              params = _evQueue$queue$[1],
              onFinish = _evQueue$queue$[2]; // on finish

          params.push(function () {
            // console.log('#FINISHED')
            evQueue.nextQueue();

            if (typeof onFinish === 'function') {
              onFinish();
            }
          });
          fn.apply(void 0, params);
        }
      },
      nextQueue: function nextQueue() {
        evQueue.queue.shift();
        evQueue.isWorking = false; // console.log('SHIFTED', evQueue.queue)

        if (evQueue.hasQueue()) {
          evQueue.runQueue();
        }
      },
      clear: function clear() {
        evQueue.queue = [];
        evQueue.isWorking = false;
      }
      /** Slider Toggler */

    };

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

        if (true && !isActive && next) {
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
//# sourceMappingURL=menu.js.map