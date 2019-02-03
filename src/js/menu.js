import jQuery from 'jquery'

/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const menuY = (() => {
  class Constructor {
    constructor(element, action, config = {}) {
      const defaultConfig = {
        multiple: false
      }
      config = {
        ...defaultConfig,
        ...config
      }

      if (element.getAttribute('data-technoart-menuy') === 'active') {
        if (action === 'toggle') {
          Constructor.toggle(config)
        }
        return
      }

      // Let's go
      Constructor.init(element, action, config)
    }

    static init(element, action, config) {
      Constructor.addEventForChild(element, 'click', 'a', (childElement, e) => {
        const $menuY = jQuery(element)
        const $active = $menuY.find('.active > ul')
        const $activeParents = $menuY.find('.active').parentsUntil($menuY, 'ul')
        const $links = jQuery(childElement)
        const $next = $links.next()
        const $isActive = $links.parent().hasClass('active') || $next.find('.active').length > 0
        const $parents = $links.parentsUntil($menuY, 'ul')

        const tigaratus = 300
        $next.slideToggle(tigaratus, () => {
          $links.parent().toggleClass('open')
        })

        if (config.multiple && !$isActive && $next.length > 0) {
          $menuY.find('ul').not($next).not($active).not($activeParents).not($parents)
            .slideUp(tigaratus)
            .parent()
            .removeClass('open')
        }

        if ($next.length > 0) {
          e.preventDefault()
        }
      })

      element.setAttribute('data-technoart-menuy', 'active')
      if (action === 'noName') {
        Constructor.noName(config)
      }
    }

    static noName() {
      const element = document.querySelector('.has-sidebar-left')
      if (element) {
        element.classList.toggle('sidebar-hide-left-default')
      }
    }

    static addEventForChild(parent, eventName, childSelector, callback) {
      parent.addEventListener(eventName, (event) => {
        const clickedElement = event.target
        const matchingChild = clickedElement.closest(childSelector)
        callback(matchingChild, event)
      })
    }
  }

  const element = document.querySelector('.menu-y')
  if (element) {
    Constructor(element)
  }

  return Constructor
})()

export {
  menuY
}
