/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const menuY = (() => {
  class Constructor {
    constructor() {
      function toggleClass(el, className) {
        if (el.classList) {
          el.classList.toggle(className)
        } else {
          const classes = el.className.split(' ')
          let existingIndex = -1
          for (let i = classes.length; i--;) {
            if (classes[i] === className) {
              existingIndex = i
            }
          }

          if (existingIndex >= 0) {
            classes.splice(existingIndex, 1)
          } else {
            classes.push(className)
          }

          el.className = classes.join(' ')
        }
      }

      function removeClass(el, className) {
        el.className = el.className.split(' ')
          .filter((cls) => {
            const isRemove = className !== cls
            return isRemove
          })
          .join(' ')
      }

      function parentsUntil(el, parent) {
        // Element.matches() polyfill
        if (typeof Element.prototype.matches !== 'function') {
          Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
              const matches = (this.document || this.ownerDocument).querySelectorAll(s)
              let i = matches.length
              while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty
              return i > -1
            }
        }

        let htmlElement = el
        const parentsUntil = []
        let until = true
        while (until) {
          htmlElement = htmlElement.parentNode
          if (htmlElement.matches && !htmlElement.matches(parent)) {
            parentsUntil.push(htmlElement)
          } else {
            until = false
          }
        }

        return parentsUntil
      }

      /** Event Queue */
      const evQueue = {
        queue: [],
        isWorking: false,
        add: (fn, params, onFinish) => {
          evQueue.queue.push([fn, params, onFinish])
          evQueue.runQueue()
        },
        hasQueue: () => {
          const isTrue = evQueue.queue.length > 0
          return isTrue
        },
        runQueue: () => {
          // console.log('RUN', !evQueue.isWorking, evQueue.queue)
          if (!evQueue.isWorking && evQueue.hasQueue()) {
            evQueue.isWorking = true
            const [fn, params, onFinish] = evQueue.queue[0]

            // on finish
            params.push(() => {
              // console.log('#FINISHED')
              evQueue.nextQueue()

              if (typeof onFinish === 'function') {
                onFinish()
              }
            })

            fn(...params)
          }
        },
        nextQueue: () => {
          evQueue.queue.shift()
          evQueue.isWorking = false
          // console.log('SHIFTED', evQueue.queue)

          if (evQueue.hasQueue()) {
            evQueue.runQueue()
          }
        },
        clear: () => {
          evQueue.queue = []
          evQueue.isWorking = false
        }
      }

      /** Slider Toggler */
      const SlideToggler = class SlideToggler {
        constructor(el1) {
          this.getHeight = this.getHeight.bind(this)
          this.toggle = this.toggle.bind(this)
          this.slideUp = this.slideUp.bind(this)
          this.slideDown = this.slideDown.bind(this)
          this.slide = this.slide.bind(this)
          this.el = el1
          if (!this.el) {
            return
          }
          window.addEventListener('resize', this.getHeight)
        }

        getHeight() {
          const clone = this.el.cloneNode(true)
          clone.style.cssText = 'visibility: hidden; display: block; margin: -999px 0'
          this.height = this.el.parentNode.appendChild(clone).clientHeight
          this.el.parentNode.removeChild(clone)
          return this.height
        }

        toggle(time, onFinish) {
          this.getHeight()
          if (!time) {
            time = this.height / 3 + 150 // eslint-disable-line no-magic-numbers
          }
          const currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none')
          const [start, end] = currHeight > this.height / 2 ? [this.height, 0] : [0, this.height] // eslint-disable-line no-magic-numbers
          return this.slide(start, end, time, onFinish)
        }

        slideUp(time, onFinish) {
          this.getHeight()
          if (!time) {
            time = this.height / 3 + 150 // eslint-disable-line no-magic-numbers
          }
          const currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none')
          return this.slide(currHeight, 0, time, onFinish)
        }

        slideDown(time, onFinish) {
          this.getHeight()
          if (!time) {
            time = this.height / 3 + 150 // eslint-disable-line no-magic-numbers
          }
          const currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none')
          return this.slide(currHeight, this.height, time, onFinish)
        }

        slide(start, end, time, onFinish) {
          if (start === end) {
            if (typeof onFinish === 'function') {
              onFinish()
            }

            return this
          }

          const disp = end - start
          const el = this.el
          let init = (new Date()).getTime()
          this.el.classList[end === 0 ? 'remove' : 'add']('open')
          this.el.style.cssText = 'overflow: hidden; display: block;'
          init = (new Date()).getTime()
          // const direction = start < end ? 'DOWN' : 'UP'
          const repeat = () => { // eslint-disable-line consistent-return
            const instance = (new Date()).getTime() - init
            const step = start + disp * instance / time
            if (instance <= time) {
              el.style.height = `${step}px` // if Math.floor(step) in [start..end]
            } else {
              el.style.cssText = `display: ${(end === 0 ? 'none' : 'block')}`
            }
            const repeatLoop = requestAnimationFrame(repeat)
            const ref = Math.floor(step)
            if ([].indexOf.call((() => {
              const results = []
              for (let i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--) {
                results.push(i)
              }
              return results
            }).apply(this), ref) < 0) {
              cancelAnimationFrame(repeatLoop)

              if (typeof onFinish === 'function') {
                onFinish()
              }

              return this
            }
          }
          return repeat()
        }
      }

      const menuY = document.querySelector('.menu-y')
      if (menuY) {
        const uls = menuY.querySelectorAll('ul')

        Array.from(uls).forEach((ul) => {
          ul.toggler = new SlideToggler(ul)
        })

        menuY.addEventListener('click', (event) => {
          const clickedElement = event.target
          const link = clickedElement.closest('a')
          const next = link.nextElementSibling || ((el) => {
            do {
              el = el.nextSibling
            } while (el && el.nodeType !== 1)
            return el
          })(link)
          const tigaratus = 300

          next.toggler.toggle(tigaratus, () => {
            toggleClass(link.parentNode, 'open')
          })

          const isActive =  next.querySelectorAll('.active').length > 0 || ((el, className) => {
            if (el.classList) {
              el.classList.contains(className)
            } else {
              new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className)
            }
          })(link.parentNode, 'active')
          const activeUls = Array.from(menuY.querySelectorAll('.active > ul'))

          const activeParents = Array.from((() => {
            const activeParents = []
            const actives = menuY.querySelectorAll('.active')
            const activesLength = actives.length
            if (activesLength > 0) {
              for (let i = 0; i < activesLength; i++) {
                const activeParent = parentsUntil(actives[i], '.menu-y', 'ul')
                const activeParentLength = activeParent.length
                if (activeParentLength > 0) {
                  for (let j = 0; j < activeParentLength; j++) {
                    activeParents.push(activeParent[j])
                  }
                }
              }
            }
            return activeParents
          })())

          const parents = parentsUntil(link, '.menu-y', 'ul')

          if (true && !isActive && next) {
            Array.from(uls)
              .filter((ul) => {
                const isRemove = ul !== next &&
                  activeUls.indexOf(ul) === -1 &&
                  activeParents.indexOf(ul) === -1 &&
                  parents.indexOf(ul) === -1
                return isRemove
              }).forEach((ul) => {
                ul.toggler.slideUp(tigaratus)
                removeClass(ul.parentNode, 'open')
              })
          }

          if (next) {
            event.preventDefault()
          }
        })
      }
    }
  }

  Constructor()

  return Constructor
})()

export {
  menuY
}
