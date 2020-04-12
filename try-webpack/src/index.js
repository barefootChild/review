// import _ from 'lodash'
import './style/index.scss'
import Icon from '_sources/icon.png'
import Data from '_sources/data.xml'

import { cube } from './js/math'

function component() {
  let ele = document.createElement('div')
  ele.innerHTML = _join(['Hello', 'webpack'], ' ')
  ele.classList.add('hello')

  let btn = document.createElement('button')
  btn.innerHTML = 'click me!'
  btn.addEventListener('click', function(e) {
    return import('./js/print').then(module => {
      let print = module.default
      print()
    })
  })
  ele.appendChild(btn)

  let pre = document.createElement('pre')
  pre.innerHTML = ['Hi webpack!', '5 cubed is equel to ' + cube(5)].join('\n\n')
  ele.appendChild(pre)

  console.log(Data)

  return ele
}

if (process.env.NONDE_ENV !== 'production') {
  console.log('I am in development')
}
document.body.appendChild(component())