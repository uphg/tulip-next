import type { App } from 'vue';
import CollapseTransition from './src/CollapseTransition'

CollapseTransition.install = function (app: App) {
  app.component(CollapseTransition.name, CollapseTransition);
}

export { CollapseTransition }

