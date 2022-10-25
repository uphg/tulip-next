import type { App } from 'vue';
import Input from './src/Input.vue'
import InputGroup from './src/InputGroup.vue'
import InputGroupLabel from './src/InputGroupLabel.vue'

Input.install = function (app: App) {
  app.component(Input.name, Input);
}

InputGroup.install = function (app: App) {
  app.component(InputGroup.name, InputGroup);
}

InputGroupLabel.install = function (app: App) {
  app.component(InputGroupLabel.name, InputGroupLabel);
}

export { Input, InputGroup, InputGroupLabel }
