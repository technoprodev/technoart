import jQuery from 'jquery'

/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const fixedOnScroll = (() => {
  class Constructor {
    constructor(element, action) {
      Constructor.init(element, action)
    }

    static init(element, action) {
      // const fixed = element.offsetTop
      const fixed = ((el) => {
        el = el.getBoundingClientRect()
        return el.top + window.scrollY
      })(element)

      const width = element.offsetWidth

      if (element.getAttribute('data-technoart-fixedonscroll') !== 'active') {
        element.setAttribute('data-technoart-fixedonscroll', 'active')

        window.addEventListener('scroll', () => {
          Constructor.toggle(element, fixed, width)
        })

        Constructor.toggle(element, fixed, width)
      }

      if (action === 'toggle') {
        Constructor.toggle(element, fixed, width)
      }
    }

    static toggle(element, fixed, width) {
      if (window.pageYOffset >= fixed) {
        element.classList.add('fixed-attached')
        element.style.width = `${width}px`
      } else {
        element.classList.remove('fixed-attached')
        element.style.width = null
      }
    }
  }

  const elements = document.querySelectorAll('.fixed-on-scroll')
  const elementsLength = elements.length
  for (let i = 0; i < elementsLength; i++) {
    if (elements[i]) {
      Constructor(elements[i])
    }
  }

  return Constructor
})()

const footerFixed = (() => {
  class Constructor {
    constructor() {
      // Let's go
      Constructor.init()
    }

    static init() {
      jQuery('.body').outerHeight('auto')
      jQuery('.page-wrapper .footer').removeClass('footer-fixed')
      const wrapperHeight = jQuery('.wrapper').outerHeight() || jQuery('.wrapper-boxed').outerHeight()
      if (wrapperHeight <= jQuery(window).outerHeight()) {
        jQuery('.page-wrapper .footer').addClass('footer-fixed')
        const headerHeight = jQuery('.header').outerHeight() || 0
        const footerHeight = jQuery('.wrapper > .footer').outerHeight() || jQuery('.wrapper-boxed > .footer').outerHeight() || 0
        const bodyHeightFix = jQuery(window).outerHeight() - (headerHeight + footerHeight)
        jQuery('.body').outerHeight(bodyHeightFix)
      }
    }
  }

  Constructor()
  jQuery(window).bind('resize', Constructor)

  return Constructor
})()

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
        element.classList.toggle('sidebar-left-hide-default')
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

const toggleSidebarLeft = (() => {
  class Constructor {
    constructor(element, action, config = {}) {
      const defaultConfig = {}
      config = {
        ...defaultConfig,
        ...config
      }

      if (element.getAttribute('data-technoart-togglesidebarleft') === 'active') {
        if (action === 'toggle') {
          Constructor.toggle(config)
        }
        return
      }

      // Let's go
      Constructor.init(element, action, config)
    }

    static init(element, action, config) {
      element.addEventListener('click', (e) => {
        Constructor.toggle(config)
        e.preventDefault()
      })

      element.setAttribute('data-technoart-togglesidebarleft', 'active')
      if (action === 'toggle') {
        Constructor.toggle(config)
      }
    }

    static toggle() {
      const element = document.querySelector('.has-sidebar-left')
      if (element) {
        element.classList.toggle('sidebar-left-hide-default')
      }
    }
  }

  const elements = document.querySelectorAll('[data-toggle="sidebar-left"]')
  const elementsLength = elements.length
  for (let i = 0; i < elementsLength; i++) {
    if (elements[i]) {
      Constructor(elements[i])
    }
  }

  return Constructor
})()

export {
  fixedOnScroll,
  footerFixed,
  menuY,
  toggleSidebarLeft
}
