import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)

Vue.directive('only-number', {
  inserted(el) {
    el.addEventListener('input', event => {
      const formattedValue = parseInt(event.target.value, 10)
      el.value = isNaN(formattedValue) ? '' : formattedValue
    })
  },
})

Vue.directive('only-phone', {
  inserted(el) {
    el.addEventListener('input', event => {
      const formattedValue = event.target.value.replace(/[^0-9]+/g, '')
      el.value = isNaN(formattedValue) ? '' : formattedValue
    })
  },
})

Vue.directive('maxlength', {
  inserted(el, binding, vnode) {
    let maxChars = binding.value
    el.addEventListener('input', e => {
      if (e.target.value.length > maxChars) {
        el.value = e.target.value.substr(0, maxChars)
        vnode.elm.dispatchEvent(new CustomEvent('input'))
      }
    })
  },
})

Vue.directive('auto-focus', {
  inserted(el) {
    el.focus()
  },
})

Vue.directive('indeterminate', {
  update(el, binding) {
    el.addEventListener('input', event => {
      el.indeterminate = Boolean(binding.value)
    })
  },
})

Vue.directive('table-resizable', {
  inserted(el) {
    const nodeName = el.nodeName
    if (!['TABLE', 'THEAD'].includes(nodeName)) {
      return
    }

    const table = nodeName === 'TABLE' ? el : el.parentElement
    const thead = table.querySelector('thead')
    const ths = thead.querySelectorAll('th')
    const barHeight = nodeName === 'TABLE' ? table.offsetHeight : thead.offsetHeight

    const resizeContainer = document.createElement('div')
    table.style.position = 'relative'
    resizeContainer.style.position = 'relative'
    resizeContainer.style.width = table.offsetWidth + 'px'
    resizeContainer.className = 'vue-columns-resizable'
    table.parentElement.insertBefore(resizeContainer, table)

    let moving = false
    let movingIndex = 0

    ths.forEach((th, index) => {
      th.style.width = th.offsetWidth + 'px'

      if (index + 1 >= ths.length) {
        return
      }

      const nextTh = ths[index + 1]
      const bar = document.createElement('div')

      bar.style.position = 'absolute'
      bar.style.left = nextTh.offsetLeft - 4 + 'px'
      bar.style.top = 0
      bar.style.height = barHeight + 'px'
      bar.style.width = '8px'
      bar.style.cursor = 'col-resize'
      bar.style.zIndex = 1
      bar.className = 'columns-resize-bar'

      bar.addEventListener('mousedown', () => {
        moving = true
        movingIndex = index
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
      })

      resizeContainer.appendChild(bar)
    })

    const bars = resizeContainer.querySelectorAll('.columns-resize-bar')

    document.addEventListener('mouseup', () => {
      if (!moving) {
        return
      }

      moving = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''

      bars.forEach((bar, index) => {
        const th = ths[index]
        const nextTh = ths[index + 1]
        th.style.width = th.offsetWidth + 'px'
        bar.style.left = nextTh.offsetLeft - 4 + 'px'
      })
    })

    const cutPx = str => +str.replace('px', '')

    const handleResize = e => {
      if (moving) {
        const th = ths[movingIndex]
        const nextTh = ths[movingIndex + 1]
        const bar = bars[movingIndex]
        th.style.width = cutPx(th.style.width) + e.movementX + 'px'
        nextTh.style.width = cutPx(nextTh.style.width) - e.movementX + 'px'
        bar.style.left = nextTh.offsetLeft - 4 + e.movementX + 'px'
      }
    }

    resizeContainer.addEventListener('mousemove', handleResize)
    table.addEventListener('mousemove', handleResize)
  },
})

const permissionHandle = (el, binding, vnode) => {
  const { currentScreenID, permissions } = vnode.context.$store.state
  el.disabled = !permissions.includes(`${currentScreenID}_EDIT`)
}

Vue.directive('permission', {
  bind: permissionHandle,
  update: permissionHandle,
})
