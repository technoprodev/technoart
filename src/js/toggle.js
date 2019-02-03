/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const toggle = (() => {
  class Constructor {
    constructor(element, targetSelector, addedClasses = '') {
      element.addEventListener('click', (e) => {
        Constructor._toggle(targetSelector, addedClasses)
        e.preventDefault()
      })
    }

    static _toggle(targetSelector, addedClasses) {
      const targets = document.querySelectorAll(targetSelector)
      const targetsLength = targets.length
      for (let i = 0; i < targetsLength; i++) {
        targets[i].classList.toggle(addedClasses)
      }
    }
  }

  const elements = document.querySelectorAll('[technoart-toggle]')
  const elementsLength = elements.length
  for (let i = 0; i < elementsLength; i++) {
    Constructor(elements[i], elements[i].getAttribute('technoart-toggle'), elements[i].getAttribute('technoart-toggleclasses'))
  }

  return Constructor
})()

export default toggle
