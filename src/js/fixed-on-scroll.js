/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const fixedOnScroll = (() => {
  class Constructor {
    constructor(element, addedClasses = '') {
      // const position = element.offsetTop
      const position = ((element) => {
        element = element.getBoundingClientRect()
        return element.top + window.scrollY
      })(element)

      const width = element.offsetWidth
      // console.log(width) // eslint-disable-line no-console

      window.addEventListener('resize', () => {
        const addition = addedClasses ? addedClasses.split(' ') : []
        element.classList.remove('fixed-attached')
        element.classList.remove(...addition)
        element.style.width = null
        Constructor._toggle(element, addedClasses, position, element.offsetWidth)
      })

      window.addEventListener('scroll', () => {
        Constructor._toggle(element, addedClasses, position, width)
      })

      Constructor._toggle(element, addedClasses, position, width)
    }

    static _toggle(element, addedClasses, position, width) {
      const addition = addedClasses ? addedClasses.split(' ') : []
      if (window.pageYOffset > position) {
        element.classList.add('fixed-attached')
        element.classList.add(...addition)
        element.style.width = `${width}px`
      } else {
        element.classList.remove('fixed-attached')
        element.classList.remove(...addition)
        element.style.width = null
      }
    }
  }

  const elements = document.querySelectorAll('[technoart-fixedonscroll]')
  const elementsLength = elements.length
  for (let i = 0; i < elementsLength; i++) {
    Constructor(elements[i], elements[i].getAttribute('technoart-fixedonscroll'))
  }

  return Constructor
})()

export default fixedOnScroll
