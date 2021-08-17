import ButtonDemo from '../views/components/ButtonDemo.vue'
import InputDemo from '../views/components/InputDemo.vue'
import SwitchDemo from '../views/components/SwitchDemo.vue'

export const components = [
  {
    path: 'button',
    name: 'ComponentsButton',
    component: ButtonDemo,
    meta: { title: 'Button 按钮' }
  },
  {
    path: 'input',
    name: 'ComponentsInput',
    component: InputDemo,
    meta: { title: 'Input 输入框' }
  },
  {
    path: 'switch',
    name: 'ComponentsSwitch',
    component: SwitchDemo,
    meta: { title: 'Switch 开关' }
  }
]