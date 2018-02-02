import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'

import './assets/styles/global.styl'

import './assets/images/2.png'

const root=document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h) =>h(App) 
}).$mount(root) //挂在 html节点


