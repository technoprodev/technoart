/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */
var menuY = function () {
  var Constructor = function Constructor() {
    var menuY = document.getElementsByClassName('menu-y');
    menuY = menuY ? menuY[0] : false;

    if (!menuY) {
      return;
    }

    function nextElementSibling(el) {
      do {
        el = el.nextSibling;
      } while (el && el.nodeType !== 1);

      return el;
    }

    function hasClass(el, className) {
      if (el.classList) {
        el.classList.contains(className);
      } else {
        new RegExp("(^| )" + className + "( |$)", 'gi').test(el.className);
      }
    }

    function toggleClass(el, className) {
      // eslint-disable-line no-unused-vars
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

    function parentsUntil(el, parent, selector) {
      // eslint-disable-line no-unused-vars
      // Element.matches() polyfill
      if (typeof Element.prototype.matches !== 'function') {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s);
          var i = matches.length;

          while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty


          return i > -1;
        };
      }

      var parents = []; // Get matching parent elements

      for (; el && el !== document; el = el.parentNode) {
        if (parent) {
          if (el.matches(parent)) {
            break;
          }
        }

        if (selector) {
          if (el.matches(selector)) {
            parents.push(el);
          }

          break;
        }

        parents.push(el);
      }

      return parents;
    }

    function parentsUntil1(el, parent, selector) {
      // eslint-disable-line no-unused-vars
      var parents = [];
      var parentType;

      if (parent) {
        parentType = parent.charAt(0);
      }

      var selectorType;

      if (selector) {
        selectorType = selector.charAt(0);
      } // Get matches


      for (; el && el !== document; el = el.parentNode) {
        // Check if parent has been reached
        if (parent) {
          // If parent is a class
          if (parentType === '.') {
            if (el.classList.contains(parent.substr(1))) {
              break;
            }
          } // If parent is an ID


          if (parentType === '#') {
            if (el.id === parent.substr(1)) {
              break;
            }
          } // If parent is a data attribute


          if (parentType === '[') {
            if (el.hasAttribute(parent.substr(1, parent.length - 1))) {
              break;
            }
          } // If parent is a tag


          if (el.tagName.toLowerCase() === parent) {
            break;
          }
        }

        if (selector) {
          // If selector is a class
          if (selectorType === '.') {
            if (el.classList.contains(selector.substr(1))) {
              parents.push(el);
            }
          } // If selector is an ID


          if (selectorType === '#') {
            if (el.id === selector.substr(1)) {
              parents.push(el);
            }
          } // If selector is a data attribute


          if (selectorType === '[') {
            if (el.hasAttribute(selector.substr(1, selector.length - 1))) {
              parents.push(el);
            }
          } // If selector is a tag


          if (el.tagName.toLowerCase() === selector) {
            parents.push(el);
          }
        } else {
          parents.push(el);
        }
      } // Return parents if any exist


      if (parents.length === 0) {
        return [];
      } else {
        // eslint-disable-line no-else-return
        return parents;
      }
    }

    function parentsUntil2(el, parent, selector) {
      // eslint-disable-line no-unused-vars
      var htmlElement = el;
      var parentsUntil = [];
      var until = true;
      /* while (htmlElement = htmlElement.parentNode.closest(parent)) { // eslint-disable-line no-cond-assign
        if (until) {
          parentsUntil.push(htmlElement)
        } else {
          until = false
        }
      }*/

      while (htmlElement = htmlElement.parentNode) {
        // eslint-disable-line no-cond-assign
        if (until && htmlElement.matches && !htmlElement.matches(parent)) {
          parentsUntil.push(htmlElement);
        } else {
          until = false;
        }
      }

      return parentsUntil;
    }

    function closest(el, selector) {
      // eslint-disable-line no-unused-vars
      // Element.matches() polyfill
      // console.log(typeof Element.prototype.matches) // eslint-disable-line no-console
      if (typeof Element.prototype.matches !== 'function') {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s);
          var i = matches.length;

          while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty


          return i > -1;
        };
      } // Get closest match


      for (; el && el !== document; el = el.parentNode) {
        if (el.matches(selector)) {
          return el;
        }
      }

      return null;
    }

    menuY.addEventListener('click', function (event) {
      var clickedElement = event.target; // const link = closest(clickedElement, 'a')

      var link = clickedElement.closest('a');
      var next = link.nextElementSibling || nextElementSibling(link);
      var threeHundred = 300;
      /* next.slideToggle(threeHundred, () => {
        toggleClass(link.parentNode, 'open')
      })*/

      var isActive = hasClass(link.parentNode, 'active') || next.querySelectorAll('.active').length > 0;
      var activeUls = menuY.querySelectorAll('.active > ul');
      var activeParents = [];
      var actives = menuY.querySelectorAll('.active');
      var activesLength = actives.length;

      if (activesLength > 0) {
        for (var i = 0; i < activesLength; i++) {
          var activeParent = parentsUntil1(actives[i], '.menu-y', 'ul');
          var activeParentLength = activeParent.length;
          console.log(activeParent); // eslint-disable-line no-console

          if (activeParentLength > 0) {
            for (var _i = 0; _i < activeParentLength; _i++) {
              console.log(activeParent[_i]); // eslint-disable-line no-console

              activeParents.push(activeParent[_i]);
            }
          }
        }
      }

      var parents = parentsUntil1(link, '.menu-y', 'ul');

      if (!isActive && next.length > 0) {
        menuY.querySelectorAll('ul').not(next).not(activeUls).not(activeParents).not(parents).slideUp(threeHundred).parentNode.removeClass('open');
      }

      if (next.length > 0) {
        event.preventDefault();
      }
    });
  };

  Constructor();
  return Constructor;
}();
//# sourceMappingURL=menu.js.map