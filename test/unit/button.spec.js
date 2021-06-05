import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'

import Button from '../../packages/Button.vue'

chai.use(sinonChai)

describe('Button.vue', () => {
  it('Button 组件存在', () => {
    expect(Button).to.exist
  })
  it('Button 组件可以添加 icon', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    })
    const useElement = wrapper.find('use')
    expect(useElement.attributes()['href']).to.equal('#icon-settings')
  })
  it('Button 组件可以触发 click 事件', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    })
    const vm = wrapper.vm

    const callback = sinon.fake()
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called
  })
})
