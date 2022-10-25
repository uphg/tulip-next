import type { App } from 'vue';
import ButtonGroup from './src/ButtonGroup.vue'
import Button from './src/Button.vue'

Button.install = function (app: App) {
  app.component(Button.name, Button);
}

ButtonGroup.install = function (app: App) {
  app.component(ButtonGroup.name, ButtonGroup);
}

export { Button, ButtonGroup }
