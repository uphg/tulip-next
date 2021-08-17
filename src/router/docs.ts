import Installation from '../views/docs/Installation.vue'
import ImportOnDemand from '../views/docs/ImportOnDemand.vue'

export const docs = [
  {
    path: 'installation',
    name: 'DocsInstallation',
    component: Installation,
    meta: { title: '安装' }
  },
  {
    path: 'import-on-demand',
    name: 'DocsImportOnDemand',
    component: ImportOnDemand,
    meta: { title: '按需引入' }
  }
]