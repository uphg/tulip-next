import ButtonDemo from '../views/components/ButtonDemo.vue'
import InputDemo from '../views/components/InputDemo.vue'
import SwitchDemo from '../views/components/SwitchDemo.vue'
import DialogDemo from '../views/components/DialogDemo.vue'
import ModalDome from '../views/components/ModalDome.vue';

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
  },
  {
    path: 'dialog',
    name: 'ComponentsDialog',
    component: DialogDemo,
    meta: { title: 'Dialog 对话框' }
  },
  {
    path: 'modal',
    name: 'ComponentsModal',
    component: ModalDome,
    meta: { title: 'Modal 对话框' }
  }
]
