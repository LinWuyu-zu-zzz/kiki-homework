
//按需导入
import {register} from './register.js'

import {login} from './login.js'

register()
login()

import './style/index.css'

import './style/index.less'
 
import pic from './assets/1.gif'  //pic就是img的src属性, url
const img = document.createElement('img') //创建img元素节点
img.src = pic
document.body.appendChild(img)

import App from './app.vue'


