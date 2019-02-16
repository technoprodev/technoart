/**
 * Technoart v0.0.9 (https://technoartcss.com)
 * Copyright (c) 2018-present Fandy Pradana (https://prafandy.com)
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */

/* global anchors: false, ClipboardJS: false */
/* eslint no-new:off */

/* Javascript code for technoart documentation */

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

  var section = document.querySelectorAll('h1')
  var sections = {}
  Array.prototype.forEach.call(section, function (e) {
    sections[e.id] = e.offsetTop
  })
  function scrollSpy() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
    var x
    var toBeActive
    for (var i in sections) {
      if (sections[i] <= scrollPosition) {
        var active = document.querySelector('#guide .active')
        if (active) {
          active.classList.remove('active', 'open')
        }
        toBeActive = document.querySelector('#guide a[href="#' + i + '"]')
        if (toBeActive) {
          toBeActive.parentElement.classList.add('active')
          x = i
        }
      }
    }
    if (x) {
      toBeActive.parentElement.classList.add('open')
    }
  }
  scrollSpy()
  window.addEventListener('scroll', scrollSpy)

  var languageVersion = document.getElementById('language-version')
  if (languageVersion) {
    languageVersion.addEventListener('change', function () {
      window.location = languageVersion.value
    })
  }
}())
