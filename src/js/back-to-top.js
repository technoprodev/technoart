/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const backToTop = (() => {
  class Constructor {
    constructor(element) {
      const minToScroll = 20
      function hideOrShow() {
        if (document.body.scrollTop > minToScroll || document.documentElement.scrollTop > minToScroll) {
          element.style.display = 'block'
        } else {
          element.style.display = 'none'
        }
      }
      hideOrShow()
      window.addEventListener('scroll', hideOrShow)

      element.addEventListener('click', () => {
        Constructor._scrollTop()
      })
    }

    static _scrollTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }

  const elements = document.querySelectorAll('[technoart-backtotop]')
  const elementsLength = elements.length
  if (elementsLength > 0) {
    for (let i = 0; i < elementsLength; i++) {
      Constructor(elements[i])
    }
  }

  return Constructor
})()

export default backToTop
