/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const backToTop = (() => {
  class Constructor {
    constructor(element, action, config = {}) {
      const defaultConfig = {
        minToScroll: 20 // in px
      }
      config = {
        ...defaultConfig,
        ...config
      }

      if (element.getAttribute('data-technoart-backtotop') === 'active') {
        if (action === 'scrollTop') {
          Constructor.scrollTop()
        }
        return
      }

      // Let's go
      Constructor.init(element, action, config)
    }

    static init(element, action, config) {
      function hideOrShow() {
        if (document.body.scrollTop > config.minToScroll || document.documentElement.scrollTop > config.minToScroll) {
          element.style.display = 'block'
        } else {
          element.style.display = 'none'
        }
      }
      hideOrShow()
      window.addEventListener('scroll', hideOrShow)

      element.addEventListener('click', () => {
        Constructor.scrollTop()
      })

      element.setAttribute('data-technoart-backtotop', 'active')
      if (action === 'scrollTop') {
        Constructor.scrollTop()
      }
    }

    static scrollTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }

  const elements = document.querySelectorAll('.back-to-top')
  const elementsLength = elements.length
  if (elementsLength > 0) {
    for (let i = 0; i < elementsLength; i++) {
      Constructor(elements[i])
    }
  }

  return Constructor
})()

export default backToTop
