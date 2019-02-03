/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

const footerFixed = (() => {
  class Constructor {
    constructor() {
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

      let wrapper = document.getElementsByClassName('wrapper') || document.getElementsByClassName('wrapper-boxed')
      wrapper = wrapper ? wrapper[0] : false

      let body = document.getElementsByClassName('body')
      body = body ? body[0] : false

      let header = document.getElementsByClassName('header')
      header = header ? header[0] : false

      let footerInPageWrapper = document.querySelectorAll('.page-wrapper > .footer')
      footerInPageWrapper = footerInPageWrapper ? footerInPageWrapper[0] : false

      let footerInWrapper = document.querySelectorAll('.wrapper > .footer') || document.querySelectorAll('.wrapper-boxed > .footer')
      footerInWrapper = footerInWrapper ? footerInWrapper[0] : false

      if (!wrapper || !body) {
        return
      }

      body.style.height = 'auto'

      const footerFixedClass = 'footer-fixed'
      if (footerInPageWrapper && footerInPageWrapper.classList) {
        footerInPageWrapper.classList.remove(footerFixedClass)
      } else if (footerInPageWrapper) {
        footerInPageWrapper.className = footerInPageWrapper.className.replace(new RegExp('(^|\\b)' + footerFixedClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ') // eslint-disable-line prefer-template
      }

      const wrapperHeight = wrapper.offsetHeight
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
      if (wrapperHeight <= windowHeight) {
        if (footerInPageWrapper && footerInPageWrapper.classList) {
          footerInPageWrapper.classList.add(footerFixedClass)
        } else if (footerInPageWrapper) {
          footerInPageWrapper.className += ` ${footerFixedClass}`
        }

        const headerHeight = header.offsetHeight || 0
        const footerHeight = footerInWrapper ? footerInWrapper.offsetHeight : 0
        const bodyHeightFix = windowHeight - (headerHeight + footerHeight)
        body.style.height = `${bodyHeightFix}px`
      }
    }
  }

  Constructor()
  // jQuery(window).bind('resize', Constructor)
  window.addEventListener('resize', () => {
    Constructor()
  })

  return Constructor
})()

export {
  footerFixed
}
