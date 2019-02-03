// Javascript code for technoart documentation

/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

/* global anchors: false, ClipboardJS: false */
/* eslint no-new:off */

(function () {
  'use strict'

  var source = document.getElementsByClassName('xxx')
  var i
  var l = source.length
  for (i = 0; i < l; i++) {
    var target = source[i].parentElement.nextElementSibling.lastElementChild
    target.textContent = source[i].innerHTML.trim().replace(/[\r\n] {0}/g, '\n')
  }

  anchors.options = {
    class: 'text-lighter hover-text-azure',
    icon: '#',
    visible: 'always'
  }
  anchors.add('h1')
  anchors.add('h2')

  var clipboard = new ClipboardJS('.copy', {
    target: function (trigger) {
      return trigger.nextElementSibling
    }
  })

  clipboard.on('success', function (e) {
    e.trigger.textContent = 'Copied!'
    setTimeout(function () {
      e.clearSelection()
      e.trigger.textContent = 'Copy'
    }, 1200)
  })
}())
